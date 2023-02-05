import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { OPERATIONHISTORY_ROUTE } from './operationHistory.route';
import { OperationHistoryComponent } from './operationHistory.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@NgModule({
  imports: [ButtonModule, TableModule, SharedModule, RouterModule.forChild([OPERATIONHISTORY_ROUTE])],
  declarations: [OperationHistoryComponent],
})
export class OperationHistoryModule {}
