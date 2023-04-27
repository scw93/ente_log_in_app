/* eslint-disable prefer-const */
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

import { AccountService } from 'app/core/auth/account.service';
import { Job } from './job.model';
import { JobService } from './job.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'jhi-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss'],
  providers: [MessageService],
})
export class JobComponent implements OnInit {
  jobs: any;
  job: Job = new Job();
  selectedJob: any;
  buttonActivated = true;
  isButtonDisabledAddBtn = false;
  display = false;
  jobTitle = '';
  isEdit = false;
  constructor(
    private messageService: MessageService,
    private accountService: AccountService,
    private jobService: JobService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllJobs();
    // eslint-disable-next-line no-console
    console.log('stanowiska');
  }

  getAllJobs(): void {
    this.jobService.getAllJobs().subscribe(response => {
      this.jobs = response;
    });
  }

  dialogButtonEvent(): void {
    if (!this.isEdit) {
      this.addJob();
    } else {
      this.updateJob();
    }
  }

  addJob(): void {
    this.job = new Job();
    this.job.jobTitle = this.jobTitle;
    if (this.jobTitle !== '') {
      this.jobService.create(this.job).subscribe(response => {
        // eslint-disable-next-line no-console
        console.log('dodano nowego uzytkownika: ', response);
        this.getAllJobs();
        this.showToast('success', 'Success!', 'Added a new role.');
        this.hideDialog();
      });
    } else {
      this.showToast('error', 'Error!', 'Please fill the empty field.');
    }
  }

  updateJob(): void {
    this.selectedJob.jobTitle = this.jobTitle;
    if (this.jobTitle !== '') {
      this.jobService.update(this.selectedJob.id!, this.selectedJob).subscribe(response => {
        // eslint-disable-next-line no-console
        console.log('zaktualizowano nowego uzytkownika: ', response);
        this.getAllJobs();
        this.showToast('success', 'Success!', 'The record was updated.');
        this.hideDialog();
      });
    } else {
      this.showToast('error', 'Error!', 'Cannot find the user.');
    }
  }

  unlockButtons(): void {
    // eslint-disable-next-line no-console
    this.buttonActivated = false;
    this.isButtonDisabledAddBtn = true;
  }

  lockButtons(): void {
    this.buttonActivated = true;
    this.isButtonDisabledAddBtn = false;
  }

  deleteSelectedRow(): void {
    // eslint-disable-next-line no-console
    console.log('usuwam rekord z nr id: ', this.selectedJob.id);
    this.jobService.deleteJob(this.selectedJob.id).subscribe(response => {
      if (response) {
        this.getAllJobs();
        this.showToast('info', 'Info Message!', 'The record was deleted.');
      } else {
        // eslint-disable-next-line no-console
        console.log('nie znaleziono stanowiska z tym id');
        this.showToast('error', 'Error!', 'Cannot find the user with that id.');
      }
    });
  }

  showDialog(flag: boolean): void {
    this.display = true;
    if (flag) {
      this.fillModel();
      this.isEdit = true;
    } else {
      this.clearModel();
      this.isEdit = false;
    }
  }

  fillModel(): void {
    this.jobTitle = this.selectedJob.jobTitle;
  }

  clearModel(): void {
    this.jobTitle = '';
  }

  hideDialog(): void {
    this.display = false;
  }

  showToast(severity: string, summary: string, detail: string): void {
    this.messageService.add({ severity, summary, detail });
  }
}
