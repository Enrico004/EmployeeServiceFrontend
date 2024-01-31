import {Pipe, PipeTransform} from '@angular/core';
import {EmployeeWithSkillDto} from "../model/employeeWithSkill";

@Pipe({
  name: 'employeeTableFilter',
  standalone: true
})
export class EmployeeTableFilterPipe implements PipeTransform {

  defaultEmployeeList: EmployeeWithSkillDto[] = [];

  transform(employeeList: EmployeeWithSkillDto[] | null, field: string, format?: string) {
    //since the async is still working
    if (employeeList == null)
      return [];
    this.defaultEmployeeList=employeeList;
    return employeeList.filter(employee=> {
      let name = employee.lastName+', '+employee.firstName;
      return name.toLowerCase().includes(field.toLowerCase());
    })
  }
}
