import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Employee } from './employee.model';
import { ApplicationConfigService } from 'app/core/config/application-config.service';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  getAllEmployees(): Observable<{}> {
    return this.http.get(this.applicationConfigService.getEndpointFor('api/employees'));
  }
}
