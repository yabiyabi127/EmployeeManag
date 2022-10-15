import { ComponentFixture, TestBed } from '@angular/core/testing';

import { addEmployeeComponent } from './addEmployee.component';

describe('AddnewComponent', () => {
  let component: addEmployeeComponent;
  let fixture: ComponentFixture<addEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ addEmployeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(addEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
