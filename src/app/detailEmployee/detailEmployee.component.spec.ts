import { ComponentFixture, TestBed } from '@angular/core/testing';

import { detailEmployeeComponent } from './detailEmployee.component';

describe('DetailDataComponent', () => {
  let component: detailEmployeeComponent;
  let fixture: ComponentFixture<detailEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ detailEmployeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(detailEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
