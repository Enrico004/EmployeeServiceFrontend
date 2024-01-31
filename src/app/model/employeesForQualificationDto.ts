export interface EmployeesForQualificationDto {
  qualification: {
    skill: string,
    id: number
  },
  employees: ShortEmployeeDto[]
}

export interface ShortEmployeeDto{
  id:number,
  lastName:string,
  firstName:string
}
