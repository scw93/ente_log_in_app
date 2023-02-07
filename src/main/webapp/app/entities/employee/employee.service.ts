import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Employee } from './employee.model';
import { ApplicationConfigService } from 'app/core/config/application-config.service';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.applicationConfigService.getEndpointFor('api/employees'));
  }

  create(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.applicationConfigService.getEndpointFor('api/employees'), employee);
  }

  update(id: number, employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.applicationConfigService.getEndpointFor('api/employees')}/${id}`, employee);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.applicationConfigService.getEndpointFor('api/employees')}/${id}`);
  }
}
