import { Pipe, PipeTransform } from '@angular/core';
import {EmployeeWithSkillDto} from "../model/employeeWithSkill";
import {EmployeeWithSkillIdDto} from "../model/EmployeeWithSkillID";

@Pipe({
  name: 'employeeSort',
  standalone: true
})
export class EmployeeSortPipe implements PipeTransform {

  transform(employeeList:EmployeeWithSkillDto[]|null): EmployeeWithSkillDto[] {
    if(employeeList==null){
      return [];
    }
    return employeeList.sort((a,b)=>{
      return a.id-b.id;
    })
  }

}
