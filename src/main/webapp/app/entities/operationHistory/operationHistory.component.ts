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
  constructor(private accountService: AccountService, private operationHistoryService: OperationHistoryService, private router: Router) {}

  ngOnInit(): void {
    this.getAllOperationsHistory();
    // eslint-disable-next-line no-console
    console.log('historie operacji');
  }

  getAllOperationsHistory(): void {
    this.operationHistoryService.getAllOperationsHistory().subscribe(response => {
      // eslint-disable-next-line no-console
      console.log(response);
      this.operationHistories = response;
      this.operationHistory = response;
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
    console.log('usuwam rekord z nr id: ', this.selectedOperationHistory.id);
  }
}
