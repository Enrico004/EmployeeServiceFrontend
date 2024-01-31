import { Pipe, PipeTransform } from '@angular/core';
import {ShortEmployeeDto} from "../model/employeesForQualificationDto";

@Pipe({
  name: 'shortEmployeeSort',
  standalone: true
})
export class ShortEmployeeSortPipe implements PipeTransform {

  transform(employeeList:ShortEmployeeDto[]|null): ShortEmployeeDto[] {
    if(employeeList==null){
      return [];
    }
    return employeeList.sort((a,b)=>{
      return a.id-b.id;
    })
  }

}
