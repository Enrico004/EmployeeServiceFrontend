import {EmployeeWithSkillID} from "./EmployeeWithSkillID";

export class EmployeeWithSkill {
  constructor(public id: number, public lastName?: string, public firstName?: string, public street?: string, public postcode?: string, public phone?: string, public skillSet?: {
    skill?: string,
    id: number
  }[]) {}

  public getEmpWithSkillId(): EmployeeWithSkillID {
    let skillId: EmployeeWithSkillID = new EmployeeWithSkillID(this.id, this.lastName, this.firstName, this.street, this.postcode, this.phone, this.skillSet?.map((item) => item.id));
    return skillId;
  }
}

