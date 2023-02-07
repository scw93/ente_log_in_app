import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { EMPLOYEE_ROUTE } from './employee.route';
import { EmployeeComponent } from './employee.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  imports: [InputTextModule, DialogModule, ButtonModule, TableModule, SharedModule, RouterModule.forChild([EMPLOYEE_ROUTE])],
  declarations: [EmployeeComponent],
})
export class EmployeeModule {}
