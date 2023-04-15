import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { EMPLOYEE2JOB_ROUTE } from './employee2Job.route';
import { Employee2JobComponent } from './employee2Job.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  imports: [
    ToastModule,
    InputTextModule,
    DialogModule,
    ButtonModule,
    TableModule,
    SharedModule,
    DropdownModule,
    RouterModule.forChild([EMPLOYEE2JOB_ROUTE]),
  ],
  declarations: [Employee2JobComponent],
})
export class Employee2JobModule {}
