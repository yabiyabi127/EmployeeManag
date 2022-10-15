import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEmployeeComponent } from './ListEmployee.component';

describe('EmployeeListPageComponent', () => {
  let component: ListEmployeeComponent;
  let fixture: ComponentFixture<ListEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListEmployeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
