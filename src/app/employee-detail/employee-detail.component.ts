import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {EmployeeWithSkill, EmployeeWithSkillDto} from "../model/employeeWithSkill";
import {EmployeeService} from "../service/employee.service";
import {FormControl, FormGroup, FormsModule} from "@angular/forms";
import {NavigationBarComponent} from "../navigation-bar/navigation-bar.component";
import {EditEmployeeQualificationComponent} from "../edit-employee-qualification/edit-employee-qualification.component";
import {MatList, MatListItem} from "@angular/material/list";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, NavigationBarComponent, EditEmployeeQualificationComponent, MatList, MatListItem],
  templateUrl: './employee-detail.component.html',
  styleUrl: './employee-detail.component.css'
})
export class EmployeeDetailComponent {

  id:string='';
  employee:EmployeeWithSkillDto|undefined;
  editSubject=new BehaviorSubject<boolean>(false)


  constructor(private route:ActivatedRoute,private employeeService:EmployeeService) {
  }

  ngOnInit(){
    //get employee from api to use all endpoints, as desired
    this.route.params.subscribe(params=>{
      this.id=params['id'];
      console.log('EmployeeId: '+this.id)
    });
    this.employeeService.getEmployeeById(this.id).subscribe(data=>{
      console.log("Employee: "+data);
      this.employee=data;
    })

  }

  editEmployee(){
    this.editSubject.next(true);
  }
  saveEmployee(){
    console.log(this.employee)
    this.editSubject.next(false);
    if(this.employee!==undefined) {
      this.employeeService.editEmployee(this.employee);
    }
  }

}
