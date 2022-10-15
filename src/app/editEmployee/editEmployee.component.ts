import { Component, OnInit, ViewChild, AfterViewInit, Optional, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupName, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first, ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { EmployeeServices } from '../APIServices/employee.services';
import Swal from 'sweetalert2';
import { GROUPS,Group } from '../APIServices/grouplist';
import { MatSelect } from '@angular/material/select';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

@Component({
  selector: 'app-edit-data',
  templateUrl: './editEmployee.component.html',
  styleUrls: ['./editEmployee.component.scss']
})

export class EditEmployeeComponent implements OnInit {
  currentEmployee: any;
  editEmpForm: FormGroup;
  id:string;
  submitted = false;
  isEditEmp:boolean;
  basicSalary= '0';
  selected: any;
  filtered: any;
  
  protected groups: Group[] = GROUPS;
  group: FormControl = new FormControl();
  public groupFilterControl: FormControl = new FormControl();
  public options: ReplaySubject<Group[]> = new ReplaySubject(1);
  @ViewChild('grouplist') grouplist: MatSelect;
  protected _onDestroy = new Subject<void>();

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, 
    private router: Router, private employeeService: EmployeeServices, private dateAdapter: DateAdapter<Date>, @Optional() @Inject(MAT_DATE_LOCALE) dateLocale: string) {
      this.dateAdapter.setLocale('id');
     }

  ngOnInit(): void {
    this.futureDateDisable();
    this.id = this.route.snapshot.params['id'];
    this.getEmpById(this.route.snapshot.paramMap.get('id'));
    this.editEmpForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
      firstName: ['', [Validators.required]],
      lastName: ['',[Validators.required]],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      birthDate: ['', [Validators.required]],
      basicSalary: ['', [Validators.required, Validators.min(500000)]],
      status: ['', [Validators.required]],
      group: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
    
    if(this.isEditEmp){
      this.employeeService.getItem(this.id).pipe(first()).subscribe(x => this.editEmpForm.patchValue(x));
    }
    
    this.group.setValue(this.groups[10]);
    this.options.next(this.groups.slice());
    this.groupFilterControl.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(()=>{
      this.filterGroup();
    })

  }

  maxDate:any;
  futureDateDisable(){
    var date:any = new Date();
    var todayDate:any = date.getDate();
    var month:any = date.getMonth() + 1;
    var year:any = date.getFullYear();
    if(todayDate<10){
      todayDate = '0' + todayDate;
    }

    if(month<10){
      month = '0' + month;
    }

    this.maxDate = year + "-" + month + "-" + todayDate;
  }

  onGroupSelection(){
    console.log(this.currentEmployee.group);
  }

  ngAfterViewInit() {
    this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  protected setInitialValue(){
    this.options.pipe(take(1), takeUntil(this._onDestroy)).subscribe(()=>{
      this.grouplist.compareWith = (a:Group, b:Group)=> a && b && a.id === b.id;
    })
  }

  protected filterGroup() {
    if (!this.groups) {
      return;
    }
    // get the search keyword
    let search = this.groupFilterControl.value;
    if (!search) {
      this.options.next(this.groups.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the group
    this.options.next(
      this.groups.filter(group => group.name.toLowerCase().indexOf(search) > -1)
    );
  }

  getEmpById(id: string | null): void {
    this.employeeService.getItem(id)
      .subscribe(
        (employee: null) => {
          this.currentEmployee = employee;
          console.log(employee);
        },
        (error: any) => {
          console.log(error);
        });
  }

  processEdit(){
    this.submitted = true;
    if(this.editEmpForm.invalid){
      return;
    }

    if(this.editEmpForm){
      this.updateDataEmp();
    }
  }

  private updateDataEmp(){
    this.employeeService.update(this.id, this.editEmpForm.value).pipe(first()).subscribe({
      next: () => {
        Swal.fire('Congratulation','Your Employee Data changed successfully!', 'success')
        this.router.navigate(['/Listemployee'], { relativeTo: this.route});
      },error: error => {
        Swal.fire({
          icon: 'error',
          title: 'Oops..',
          text: 'Something went wrong!'
        })
      }
    })
  }

}
