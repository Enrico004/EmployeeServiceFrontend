import {SimpleQualificationDto} from "./simpleQualificationDto";

export interface EmployeeSkillSetDto{
  id:number;
  firstName:string;
  lastName:string;
  skillSet:SimpleQualificationDto[];
}
