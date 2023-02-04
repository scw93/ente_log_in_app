import { Route } from '@angular/router';

import { EmployeeComponent } from './employee.component';

export const EMPLOYEE_ROUTE: Route = {
  path: '',
  component: EmployeeComponent,
  data: {
    pageTitle: 'login.title',
  },
};
