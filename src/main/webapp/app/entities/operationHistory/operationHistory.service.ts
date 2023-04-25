import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { OperationHistory } from './operationHistory.model';
import { ApplicationConfigService } from 'app/core/config/application-config.service';

@Injectable({ providedIn: 'root' })
export class OperationHistoryService {
  constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  getAllOperationsHistory(): Observable<{}> {
    return this.http.get(this.applicationConfigService.getEndpointFor('api/operation-histories'));
  }

  deleteOperationHistory(id: number): Observable<any> {
    return this.http.delete(`${this.applicationConfigService.getEndpointFor('api/operation-histories')}/${id}`);
  }
}
