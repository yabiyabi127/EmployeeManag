import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeServices } from '../APIServices/employee.services';
import { first, map, Observable, ReplaySubject, Subject } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-detail-data',
  templateUrl: './detailEmployee.component.html',
  styleUrls: ['./detailEmployee.component.scss']
})
export class detailEmployeeComponent implements OnInit {
  currentEmployee: any;
  constructor(private route: ActivatedRoute, private router: Router, private employeeService: EmployeeServices) { }

  ngOnInit(): void {
    this.getEmpById(this.route.snapshot.paramMap.get('id'));
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

}
