import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { JOB_ROUTE } from './job.route';
import { JobComponent } from './job.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';

@NgModule({
  imports: [ToastModule, InputTextModule, DialogModule, ButtonModule, TableModule, SharedModule, RouterModule.forChild([JOB_ROUTE])],
  declarations: [JobComponent],
})
export class JobModule {}
