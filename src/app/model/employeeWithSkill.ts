import {QualificationDto} from "./qualificationDto";

export class EmployeeWithSkill {
  constructor(public id: number, public lastName?: string, public firstName?: string, public street?: string, public city?: string, public postcode?: string, public phone?: string, public skillSet?: {
    skill?: string,
    id: number
  }[]) {}
}
export interface EmployeeWithSkillDto{
  id:number;
  lastName:string;
  firstName:string;
  street:string;
  city:string;
  postcode:string;
  phone:string;
  skillSet:QualificationDto[];
}

