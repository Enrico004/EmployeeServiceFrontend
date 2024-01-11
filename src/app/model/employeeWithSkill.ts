export class EmployeeWithSkill {
  constructor(public id: number, public lastName?: string, public firstName?: string, street?: string, postcode?: string, phone?: string, skillset?: {
    skill?: string,
    id?: number
  }) {}
}

