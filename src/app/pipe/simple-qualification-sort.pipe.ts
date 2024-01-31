import { Pipe, PipeTransform } from '@angular/core';
import {SimpleQualificationDto} from "../model/simpleQualificationDto";

@Pipe({
  name: 'simpleQualificationSort',
  standalone: true
})
export class SimpleQualificationSortPipe implements PipeTransform {

  transform(qualificationList:SimpleQualificationDto[]): SimpleQualificationDto[] {
    if (qualificationList == null)
      return [];
    return qualificationList.sort((a, b) => {
      return (a.skill > b.skill ? 1 : -1);
    })
  }

}
