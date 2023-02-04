import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { EMPLOYEE_ROUTE } from './employee.route';
import { EmployeeComponent } from './employee.component';

@NgModule({
  imports: [SharedModule, RouterModule.forChild([EMPLOYEE_ROUTE])],
  declarations: [EmployeeComponent],
})
export class EmployeeModule {}
