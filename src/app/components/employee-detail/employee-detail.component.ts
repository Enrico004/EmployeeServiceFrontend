import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {EmployeeWithSkillDto} from "../../model/employeeWithSkill";
import {EmployeeService} from "../../service/employee.service";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NavigationBarComponent} from "../navigation-bar/navigation-bar.component";
import {EditEmployeeQualificationComponent} from "../edit-employee-qualification/edit-employee-qualification.component";
import {MatList, MatListItem} from "@angular/material/list";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, NavigationBarComponent, EditEmployeeQualificationComponent, MatList, MatListItem, ReactiveFormsModule],
  templateUrl: './employee-detail.component.html',
  styleUrl: './employee-detail.component.css'
})
export class EmployeeDetailComponent {

  id:string='';
  @Input()employee: EmployeeWithSkillDto | undefined;
  editSubject = new BehaviorSubject<boolean>(false)
  employeeForm: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    street: new FormControl(''),
    city: new FormControl(''),
    postcode: new FormControl(''),
    phone: new FormControl('')
  })
  @Output()quitView = new EventEmitter();

  constructor(private route: ActivatedRoute,
              private employeeService: EmployeeService,
              private router: Router
  ) { }

  quitDetailView(){
/*
    this.router.navigateByUrl('/employee')
*/
    this.quitView.emit();
  }

  editEmployee(){
    this.editSubject.next(true);
    this.setFormValue(this.employee!);
  }
  saveEmployee(){
    let formEmployee = this.employeeForm.getRawValue()
    console.log(this.employeeForm.getRawValue())
    let editedEmployee: EmployeeWithSkillDto={
      id:parseInt(this.id),
      firstName: formEmployee.firstName,
      lastName: formEmployee.lastName,
      street: formEmployee.street,
      city: formEmployee.city,
      postcode: formEmployee.postcode,
      phone: formEmployee.phone,
      skillSet: this.employee!.skillSet
    }
    this.employeeService.editEmployee(editedEmployee).subscribe(data=>{
      this.employee=data;
      this.stopEditing()
    });

  }

  cancelEditing(){
    this.stopEditing();
    this.setFormValue(this.employee!);
  }

  stopEditing(){
    this.editSubject.next(false);
  }

  editEmployeeQualification(){
    this.router.navigateByUrl(`employee/${this.employee!.id}/qualification`);
    this.quitDetailView();
  }

  setFormValue(data: EmployeeWithSkillDto){
    this.employeeForm.patchValue({
      firstName: data.firstName,
      lastName: data.lastName,
      street: data.street,
      city: data.city,
      postcode: data.postcode,
      phone: data.phone
    });
  }

}
