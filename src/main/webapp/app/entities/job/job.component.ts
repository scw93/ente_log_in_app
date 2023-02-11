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
  display = false;
  jobTitle = '';
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

  showDialog(flag: boolean): void {
    this.display = true;
    if (flag) {
      this.fillModel();
    } else {
      this.clearModel();
    }
  }

  fillModel(): void {
    this.jobTitle = this.selectedJob.jobTitle;
  }

  clearModel(): void {
    this.jobTitle = '';
  }

  updateJob(): void {
    this.jobService.update(this.selectedJob.id!, this.selectedJob).subscribe(response => {
      // eslint-disable-next-line no-console
      console.log('zaktualizowano nowego uzytkownika: ', response);
      this.getAllJobs();
    });
    this.hideDialog();
  }

  //obejrzec filmik i wiedziec dlaczego 2x w tabelce selectedJob!!!
  updateEmployee(): void {
    this.employeeService.update(this.selectedEmployee.id!, this.selectedEmployee).subscribe(response => {
      // eslint-disable-next-line no-console
      console.log('zaktualizowano nowego uzytkownika: ', response);
      this.getAllEmployees();
    });
    this.hideDialog();
  }
}
