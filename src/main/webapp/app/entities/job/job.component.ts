import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

import { AccountService } from 'app/core/auth/account.service';
import { JobService } from './job.service';

@Component({
  selector: 'jhi-job',
  templateUrl: './job.component.html',
  // styleUrls: ['./employee.component.css'],
})
export class JobComponent implements OnInit {
  jobs: any;
  job: any;
  selectedJob: any;
  buttonActivated = true;
  constructor(private accountService: AccountService, private jobService: JobService, private router: Router) {}

  ngOnInit(): void {
    this.getAllJobs();
    // eslint-disable-next-line no-console
    console.log('stanowiska');
  }

  getAllJobs(): void {
    this.jobService.getAllJobs().subscribe(response => {
      // eslint-disable-next-line no-console
      console.log(response);
      this.jobs = response;
      this.job = response;
    });
  }

  unlockRow(): void {
    // eslint-disable-next-line no-console
    this.buttonActivated = false;
  }

  lockRow(): void {
    // eslint-disable-next-line no-console
    this.buttonActivated = true;
  }

  deleteSelectedRow(): void {
    // eslint-disable-next-line no-console
    console.log('usuwam rekord z nr id: ', this.selectedJob.id);
    this.jobService.deleteJob(this.selectedJob.id).subscribe(response => {
      if (response) {
        this.getAllJobs();
      } else {
        // eslint-disable-next-line no-console
        console.log('nie znaleziono stanowiska z tym id');
      }
    });
  }
}
