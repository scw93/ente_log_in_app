import { Route } from '@angular/router';

import { Employee2JobComponent } from './employee2Job.component';

export const EMPLOYEE2JOB_ROUTE: Route = {
  path: '',
  component: Employee2JobComponent,
  data: {
    pageTitle: 'login.title',
  },
};
