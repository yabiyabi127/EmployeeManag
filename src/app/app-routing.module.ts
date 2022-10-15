import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListEmployeeComponent } from './ListEmployee/ListEmployee.component';
import { LoginPageComponent } from './loginPage/loginPage.component';
import { addEmployeeComponent } from './addEmployee/addEmployee.component';
import { EditEmployeeComponent } from './editEmployee/editEmployee.component';
import { detailEmployeeComponent } from './detailEmployee/detailEmployee.component';

const empModule = () => import('./app.module').then(x => x.AppModule);
const routes: Routes = [{
  path:'',
  component:LoginPageComponent
},{
  path: 'Listemployee',
  component:ListEmployeeComponent
},{
  path: 'Addemployee',
  component:addEmployeeComponent
},{
  path: 'Editemployee/:id',
  component:EditEmployeeComponent
},{
  path: 'Detailemployee/:id',
  component:detailEmployeeComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
