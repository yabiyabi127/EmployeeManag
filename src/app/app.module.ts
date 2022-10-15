import { NgModule, LOCALE_ID} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LoginPageComponent } from './loginPage/loginPage.component';
import { ListEmployeeComponent } from './ListEmployee/ListEmployee.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule} from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { addEmployeeComponent} from './addEmployee/addEmployee.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter'
import { DateAdapter, MatNativeDateModule, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { EditEmployeeComponent } from './editEmployee/editEmployee.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { detailEmployeeComponent } from './detailEmployee/detailEmployee.component';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { DatePipe } from '@angular/common';
@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    ListEmployeeComponent,
    addEmployeeComponent,
    EditEmployeeComponent,
    detailEmployeeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatNativeDateModule,
    MatCardModule,
    MatDividerModule,
    MatAutocompleteModule,
    NgxMatSelectSearchModule,
    MatListModule,
    MatSidenavModule,
    CurrencyMaskModule
  ],
  providers: [DatePipe,
    {
      provide: MAT_DATE_LOCALE, useValue: 'id-ID'
    },
    { 
    provide: DateAdapter, 
    useClass: MomentDateAdapter, 
    deps:[MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS], 
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS}],
  bootstrap: [AppComponent]
})
export class AppModule { }
