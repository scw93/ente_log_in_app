import { Route } from '@angular/router';

import { OperationHistoryComponent } from './operationHistory.component';

export const OPERATIONHISTORY_ROUTE: Route = {
  path: '',
  component: OperationHistoryComponent,
  data: {
    pageTitle: 'login.title',
  },
};
