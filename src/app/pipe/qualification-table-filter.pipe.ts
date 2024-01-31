import { Pipe, PipeTransform } from '@angular/core';
import {QualificationDto} from "../model/qualificationDto";

@Pipe({
  name: 'qualificationTableFilter',
  standalone: true
})
export class QualificationTableFilterPipe implements PipeTransform {

  defaultQualificationList:QualificationDto[]=[];

  transform(qualificationList: QualificationDto[] | null, field: string):QualificationDto[] {
    //since the async is still working
    if (qualificationList == null)
      return [];
    this.defaultQualificationList=qualificationList;
    return qualificationList.filter(qualification=> {
      return qualification.skill.toLowerCase().includes(field.toLowerCase());
    })
  }

}
