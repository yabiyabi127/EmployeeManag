import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, ViewEncapsulation, EventEmitter, Input, Output } from '@angular/core';
import { response } from 'express';
import { EmployeeServices } from '../APIServices/employee.services';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ReplaySubject, Subject, Subscription } from 'rxjs';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { GROUPS,Group } from '../APIServices/grouplist';
import { take, takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';

export class Ngroup{
  constructor(public name: string){}
}
@Component({
  selector: 'app-addnew',
  templateUrl: './addEmployee.component.html',
  styleUrls: ['./addEmployee.component.scss']
})
export class addEmployeeComponent implements OnInit {
  addEmpForm: FormGroup;
  // groupsel!: string;
  basicSalary= '0';
  selected: any;
  filtered: any;

  protected groups: Group[] = GROUPS;
  group: FormControl = new FormControl();
  public groupFilterControl: FormControl = new FormControl();
  public options: ReplaySubject<Group[]> = new ReplaySubject<Group[]>(1);
  @ViewChild('grouplist',{static: true}) grouplist: MatSelect;
  protected _onDestroy = new Subject<void>();

  get email(){
    return this.addEmpForm.get("email");
  }
  
  @Output() onSelectionChange: EventEmitter<any> = new EventEmitter<any>();
  constructor(private employeeService: EmployeeServices, private formBuilder: FormBuilder, 
    private route: ActivatedRoute, private router: Router) { 
  }

  ngOnInit():void {
    this.futureDateDisable();

    this.addEmpForm = this.formBuilder.group({
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

  ngAfterViewInit(): void {
    this.setInitialValue();
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  onChange($event:any) {
    this.onSelectionChange.emit($event);
  }

  private setInitialValue() {
    this.options
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        if(this.grouplist)
          this.grouplist.compareWith = (a: Group, b: Group) => a.id === b.id;
      });
  }

  private filterGroup() {
    if (!this.groups) {
      return;
    }
    let search = this.groupFilterControl.value;
    if (!search) {
      this.options.next(this.groups.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.options.next(
      this.groups.filter(option => option.name.toLowerCase().indexOf(search) > -1)
    );
  }
  // onGroupSelection(){
  //   console.log(this.groupsel);
  // }

  processAdd(){
    console.log(this.addEmpForm.controls['group'].value);
    Swal.fire({
      title: 'Are you sure?',
      text: "Please Check your Data before saving",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Add this Data!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Congratulation',
          'New Employee Data has been added!',
          'success'
        )
        this.employeeService.create(this.addEmpForm.value).subscribe({
          next: (res) => {
            this.router.navigate(['/Listemployee'], { relativeTo: this.route});
          }, error:()=>{
            alert("Error while adding new Employee")
          }
        })
      }
    })

     
  }
}
