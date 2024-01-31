import {QualificationDto} from "./qualificationDto";

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
export function instanceOfEmployeeWithSkillDto(object: any): object is EmployeeWithSkillDto {
  console.log(object.id)
  return object.id==undefined
}

