import { Pipe, PipeTransform } from '@angular/core';
import {QualificationDto} from "../model/qualificationDto";

@Pipe({
  name: 'qualificationSort',
  standalone: true
})
export class QualificationSortPipe implements PipeTransform {

  transform(qualificationList: QualificationDto[]|null):QualificationDto[] {
    //since the async is still working
    if (qualificationList == null)
      return [];
    return qualificationList.sort((a,b)=>{
      return (a.skill>b.skill?1:-1);
    })
  }

}
