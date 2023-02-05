import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { JOB_ROUTE } from './job.route';
import { JobComponent } from './job.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material';

@NgModule({
  imports: [MatTableModule, MatSlideToggleModule, ButtonModule, TableModule, SharedModule, RouterModule.forChild([JOB_ROUTE])],
  declarations: [JobComponent],
})
export class JobModule {}
