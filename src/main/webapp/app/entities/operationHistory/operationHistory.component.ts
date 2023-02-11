import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

import { AccountService } from 'app/core/auth/account.service';
import { OperationHistoryService } from './operationHistory.service';

@Component({
  selector: 'jhi-operation-history',
  templateUrl: './operationHistory.component.html',
})
export class OperationHistoryComponent implements OnInit {
  operationHistories: any;
  operationHistory: any;
  selectedOperationHistory: any;
  buttonActivated = true;
  display = false;
  newOperation = '';
  constructor(private accountService: AccountService, private operationHistoryService: OperationHistoryService, private router: Router) {}

  ngOnInit(): void {
    this.getAllOperationsHistory();
    // eslint-disable-next-line no-console
    console.log('historie operacji');
  }

  unlockButtons(): void {
    this.buttonActivated = false;
  }

  lockButtons(): void {
    this.buttonActivated = true;
  }

  getAllOperationsHistory(): void {
    this.operationHistoryService.getAllOperationsHistory().subscribe(response => {
      // eslint-disable-next-line no-console
      console.log(response);
      this.operationHistories = response;
      this.operationHistory = response;
    });
  }

  deleteSelectedRow(): void {
    // eslint-disable-next-line no-console
    console.log('usuwam rekord z nr id: ', this.selectedOperationHistory.id);
    this.operationHistoryService.deleteOperationHistory(this.selectedOperationHistory.id).subscribe(response => {
      if (response) {
        this.getAllOperationsHistory();
      } else {
        // eslint-disable-next-line no-console
        console.log('nie znaleziono stanowiska z tym id');
      }
    });
  }

  showDialog(): void {
    this.display = true;
  }
}
