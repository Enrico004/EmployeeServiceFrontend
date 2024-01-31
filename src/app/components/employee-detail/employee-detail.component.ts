import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, RouterLink} from "@angular/router";
import {EmployeeWithSkillDto} from "../../model/employeeWithSkill";
import {EmployeeService} from "../../service/employee.service";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NavigationBarComponent} from "../navigation-bar/navigation-bar.component";
import {EditEmployeeQualificationComponent} from "../edit-employee-qualification/edit-employee-qualification.component";
import {MatList, MatListItem} from "@angular/material/list";
import {BehaviorSubject} from "rxjs";
import {QualificationSortPipe} from "../../pipe/qualification-sort.pipe";
import {ToastService} from "../../service/toast.service";

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, NavigationBarComponent, EditEmployeeQualificationComponent, MatList, MatListItem, ReactiveFormsModule, QualificationSortPipe],
  templateUrl: './employee-detail.component.html',
  styleUrl: './employee-detail.component.css'
})
export class EmployeeDetailComponent {

  @Input()employee: EmployeeWithSkillDto | undefined;
  editSubject:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  employeeForm: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    street: new FormControl(''),
    city: new FormControl(''),
    postcode: new FormControl(''),
    phone: new FormControl('')
  })
  @Output()quitView = new EventEmitter();

  constructor(private employeeService: EmployeeService, private toastService:ToastService,
              private router: Router
  ) { }

  quitDetailView(){
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
      id:this.employee?.id!,
      firstName: formEmployee.firstName,
      lastName: formEmployee.lastName,
      street: formEmployee.street,
      city: formEmployee.city,
      postcode: formEmployee.postcode,
      phone: formEmployee.phone,
      skillSet: this.employee!.skillSet
    }
    this.employeeService.editEmployee(editedEmployee).subscribe({
      next: (result:EmployeeWithSkillDto)=>{
        this.employee=result;
        this.stopEditing()
        this.toastService.showSuccessToast('Änderungen gespeichert')
      },
      error: (err:any)=>{
        console.error(err);
        this.toastService.showErrorToast("Änderungen könnten nicht gespeichert werden")
      }
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
