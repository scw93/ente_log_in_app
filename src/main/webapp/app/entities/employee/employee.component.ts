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
  dataSource: any;
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
}
