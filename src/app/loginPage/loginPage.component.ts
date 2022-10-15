import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { EmployeeServices } from '../APIServices/employee.services';
import { first } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './loginPage.component.html',
  styleUrls: ['./loginPage.component.scss']
})

export class LoginPageComponent implements OnInit  {
  loginForm: FormGroup
  submitted = false;
  error = '';
  constructor(
    private router:Router, private formBuilder : FormBuilder, private http : HttpClient, 
    private route: ActivatedRoute, private employeeService: EmployeeServices
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username:['', Validators.required],
      password:['', Validators.required]
    })
  }
  
  get f(){
    return this.loginForm.controls;
  }
  
  login(){
    if(this.loginForm){
      this.processLogin();
    }
  }
  
  private processLogin(){
    this.http.get<any>("http://localhost:3000/loginAccount").subscribe(res =>{
      const user = res.find((a:any)=>{
        return a.username === this.loginForm.value.username && a.password === this.loginForm.value.password
      });
      if(user){
        alert('Login Successfull Click Ok for go to Dashboard');
        this.loginForm.reset;
        this.router.navigate(["/Listemployee"])
      }else{
        alert("User not found in Database")
      }
    }, err =>{
      alert("Something went wrong, Please Run Json-Server")
    })
  }

}
