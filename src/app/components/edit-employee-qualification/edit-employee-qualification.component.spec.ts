import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEmployeeQualificationComponent } from './edit-employee-qualification.component';

describe('EditEmployeeQualificationComponent', () => {
  let component: EditEmployeeQualificationComponent;
  let fixture: ComponentFixture<EditEmployeeQualificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditEmployeeQualificationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditEmployeeQualificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
