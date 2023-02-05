import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

import { AccountService } from 'app/core/auth/account.service';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'jhi-employee',
  templateUrl: './employee.component.html',
})
export class EmployeeComponent implements OnInit {
  employees: any;
  employee: any;
  selectedEmployee: any;
  buttonActivated = true;
  constructor(private accountService: AccountService, private employeeService: EmployeeService, private router: Router) {}

  ngOnInit(): void {
    this.getAllEmployees();
    // eslint-disable-next-line no-console
    console.log('pracownicy');
  }

  getAllEmployees(): void {
    this.employeeService.getAllEmployees().subscribe(response => {
      // eslint-disable-next-line no-console
      console.log(response);
      this.employees = response;
      this.employee = response;
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
    console.log('usuwam rekord z nr id: ', this.selectedEmployee.id);
  }
}
