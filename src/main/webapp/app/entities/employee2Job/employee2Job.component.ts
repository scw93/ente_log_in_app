/* eslint-disable prefer-const */
import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

import { AccountService } from 'app/core/auth/account.service';
import { Employee2Job } from './employee2Job.model';
import { Employee2JobService } from './employee2Job.service';
import { MessageService } from 'primeng/api';
import { EmployeeService } from '../employee/employee.service';
import { JobService } from '../job/job.service';
import { Job } from '../job/job.model';
import { Employee } from '../employee/employee.model';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'jhi-employee2Job',
  templateUrl: './employee2Job.component.html',
  styleUrls: ['./employee2Job.component.scss'],
  providers: [MessageService],
})
export class Employee2JobComponent implements OnInit {
  employee2Jobs: any;
  employees: Employee[] = [];
  selectedEmployee: Employee | undefined = new Employee();
  jobs: Job[] = [];
  selectedJob: Job | undefined = new Job();
  employee2Job: Employee2Job = new Employee2Job();
  selectedemployee2Job: Employee2Job = new Employee2Job();
  buttonActivated = true;
  isButtonDisabledAddBtn = false;
  display = false;
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
    this.employee2JobService.deleteJob(this.selectedemployee2Job.id!).subscribe(response => {
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

  updateEmployee(): void {
    if (this.selectedJob?.jobTitle !== this.selectedemployee2Job.job?.jobTitle) {
      this.selectedemployee2Job.job = this.selectedJob;
      this.employee2JobService.update(this.selectedemployee2Job).subscribe(response => {
        // eslint-disable-next-line no-console
        console.log('zaktualizowano nowego uzytkownika: ', response);
        this.getAllEmployees();
      });
      this.hideDialog();
    } else {
      this.showToast('info', 'Info Message!', 'Change Job first!');
    }
  }

  showDialog(flag: boolean): void {
    if (typeof this.selectedemployee2Job.job !== 'undefined' && typeof this.selectedemployee2Job.employee !== 'undefined') {
      this.selectedJob = this.jobs.find(job => this.selectedemployee2Job.job?.jobTitle === job.jobTitle);
      this.selectedEmployee = this.employees.find(employee => this.selectedemployee2Job.employee?.id === employee.id);
    }
    this.display = true;
    if (flag) {
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

  showToast(severity: string, summary: string, detail: string): void {
    this.messageService.add({ severity, summary, detail });
  }
}
