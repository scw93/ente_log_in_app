/* eslint-disable prefer-const */
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

import { AccountService } from 'app/core/auth/account.service';
import { Employee2Job } from './employee2Job.model';
import { Employee2JobService } from './employee2Job.service';
import { MessageService } from 'primeng/api';
import { EmployeeService } from '../employee/employee.service';
import { JobService } from '../job/job.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'jhi-employee2Job',
  templateUrl: './employee2Job.component.html',
  styleUrls: ['./employee2Job.component.scss'],
  providers: [MessageService],
})
export class Employee2JobComponent implements OnInit {
  employee2Jobs: any;
  employees: any;
  selectedEmployee: any;
  jobs: any;
  selectedJob: any;
  employee2Job: Employee2Job = new Employee2Job();
  selectedemployee2Job: any;
  buttonActivated = true;
  isButtonDisabledAddBtn = false;
  display = false;
  // jobTitle = '';
  isEdit = false;
  constructor(
    private messageService: MessageService,
    private accountService: AccountService,
    private employee2JobService: Employee2JobService,
    private router: Router,
    private employeeService: EmployeeService,
    private jobService: JobService
  ) {}

  ngOnInit(): void {
    this.getAllEmployees();
    this.getEmployees();
    this.getJobs();
  }

  getAllEmployees(): void {
    this.employee2JobService.getAllEmployees().subscribe(response => {
      this.employee2Jobs = response;
    });
  }

  getEmployees(): void {
    this.employeeService.getAllEmployees().subscribe(response => {
      this.employees = response;
    });
  }

  getJobs(): void {
    this.jobService.getAllJobs().subscribe(response => {
      this.jobs = response;
    });
  }

  deleteSelectedRow(): void {
    this.employee2JobService.deleteJob(this.selectedemployee2Job.id).subscribe(response => {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (response) {
        this.getAllEmployees();
        this.showToast('info', 'Info Message!', 'The record was deleted.');
      } else {
        // eslint-disable-next-line no-console
        console.log('nie znaleziono stanowiska z tym id');
        this.showToast('error', 'Error!', 'Cannot find the user with that id.');
      }
    });
  }

  unlockButtons(): void {
    this.buttonActivated = false;
    this.isButtonDisabledAddBtn = true;
  }

  lockbuttons(): void {
    this.buttonActivated = true;
    this.isButtonDisabledAddBtn = false;
  }

  // getAllJobs(): void {
  //   this.employee2JobService.getAllJobs().subscribe(response => {
  //     this.jobs = response;
  //   });
  // }

  // dialogButtonEvent(): void {
  //   if (!this.isEdit) {
  //     this.addJob();
  //   } else {
  //     this.updateJob();
  //   }
  // }

  // addJob(): void {
  //   this.employee2Job = new Employee2Job();
  //   this.job.jobTitle = this.jobTitle;
  //   if (this.jobTitle !== '') {
  //     this.Employee2JobService.create(this.job).subscribe(response => {
  //       // eslint-disable-next-line no-console
  //       console.log('dodano nowego uzytkownika: ', response);
  //       this.getAllJobs();
  //       this.showToast('success', 'Success!', 'Added a new employee.');
  //       this.hideDialog();
  //     });
  //   } else {
  //     this.showToast('error', 'Error!', 'Cannot add a new user.');
  //   }
  // }

  // updateJob(): void {
  //   this.selectedJob.jobTitle = this.jobTitle;
  //   if (this.jobTitle !== '') {
  //     this.jobService.update(this.selectedJob.id!, this.selectedJob).subscribe(response => {
  //       // eslint-disable-next-line no-console
  //       console.log('zaktualizowano nowego uzytkownika: ', response);
  //       this.getAllJobs();
  //       this.showToast('success', 'Success!', 'The record was updated.');
  //       this.hideDialog();
  //     });
  //   } else {
  //     this.showToast('error', 'Error!', 'Cannot find the user.');
  //   }
  // }

  // deleteSelectedRow(): void {
  //   // eslint-disable-next-line no-console
  //   console.log('usuwam rekord z nr id: ', this.selectedJob.id);
  //   this.jobService.deleteJob(this.selectedJob.id).subscribe(response => {
  //     if (response) {
  //       this.getAllJobs();
  //       this.showToast('info', 'Info Message!', 'The record was deleted.');
  //     } else {
  //       // eslint-disable-next-line no-console
  //       console.log('nie znaleziono stanowiska z tym id');
  //       this.showToast('error', 'Error!', 'Cannot find the user with that id.');
  //     }
  //   });
  // }

  showDialog(flag: boolean): void {
    this.display = true;
    if (flag) {
      // this.fillModel();
      this.isEdit = true;
    } else {
      // this.clearModel();
      this.isEdit = false;
    }
  }

  // fillModel(): void {

  //   // this.jobTitle = this.selectedJob.jobTitle;
  // }

  // clearModel(): void {
  //   this.jobTitle = '';
  // }

  hideDialog(): void {
    this.display = false;
  }

  // showError(): void {
  //   this.messageService.add({ severity: 'error', summary: 'Error!', detail: 'Cannot add an empty value.' });
  // }

  // showSuccess(response: string): void {
  //   this.messageService.add({ severity: 'success', summary: 'Success!', detail: response });
  // }

  // showInfo(): void {
  //   this.messageService.add({ severity: 'info', summary: 'Info Message!', detail: 'The record was deleted.' });
  // }

  showToast(severity: string, summary: string, detail: string): void {
    this.messageService.add({ severity, summary, detail });
  }
}
