export interface EmployeesForQualificationDto {
  qualification: {
    skill: string,
    id: number
  },
  employees: [
    {
      id: number,
      lastName: string,
      firstName: string
    }
  ]
}
