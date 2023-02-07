import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

import { AccountService } from 'app/core/auth/account.service';
import { Employee } from './employee.model';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'jhi-employee',
  templateUrl: './employee.component.html',
})
export class EmployeeComponent implements OnInit {
  employees: Employee[] = [];
  selectedEmployee: Employee = new Employee();
  isButtonDisabled = true;
  display = false;
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
    });
  }

  unlockButtons(): void {
    this.isButtonDisabled = false;
  }

  lockButtons(): void {
    this.isButtonDisabled = true;
    this.clearModel();
  }

  deleteSelectedRow(): void {
    // eslint-disable-next-line no-console
    console.log('usuwam rekord z nr id: ', this.selectedEmployee.id);
    // ZROB SOFT DELETE ZAMIAST WYWALAC CALKIEM Z BAZY
    this.employeeService.delete(this.selectedEmployee.id!).subscribe(response => {
      if (response) {
        this.getAllEmployees();
      } else {
        // eslint-disable-next-line no-console
        console.log('nie znaleziono pracownika z tym id');
      }
    });
  }

  showDialog(): void {
    this.display = true;
  }

  clearModel(): void {
    this.selectedEmployee = new Employee();
  }

  addEmployee(): void {
    this.employeeService.create(this.selectedEmployee).subscribe(response => {
      // eslint-disable-next-line no-console
      console.log('dodano nowego uzytkownika: ', response);
      this.getAllEmployees();
    });
    this.hideDialog();
  }

  updateEmployee(): void {
    this.employeeService.update(this.selectedEmployee.id!, this.selectedEmployee).subscribe(response => {
      // eslint-disable-next-line no-console
      console.log('zaktualizowano nowego uzytkownika: ', response);
      this.getAllEmployees();
    });
    this.hideDialog();
  }

  isAdd(): boolean {
    if (this.selectedEmployee.id === undefined) {
      return true;
    } else {
      return false;
    }
  }

  hideDialog(): void {
    this.display = false;
  }
}
