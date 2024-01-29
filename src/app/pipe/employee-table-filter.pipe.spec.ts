import { EmployeeTableFilterPipe } from './table-filter.pipe';

describe('TableFilterPipe', () => {
  it('create an instance', () => {
    const pipe = new EmployeeTableFilterPipe();
    expect(pipe).toBeTruthy();
  });
});
