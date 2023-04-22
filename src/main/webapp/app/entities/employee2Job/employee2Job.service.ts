import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Employee2Job } from './employee2Job.model';
import { ApplicationConfigService } from 'app/core/config/application-config.service';

@Injectable({ providedIn: 'root' })
export class Employee2JobService {
  constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  getAllEmployees(): Observable<Employee2Job[]> {
    return this.http.get<Employee2Job[]>(this.applicationConfigService.getEndpointFor('api/employee-2-jobs'));
  }

  deleteJob(id: number): Observable<{}> {
    return this.http.delete(`${this.applicationConfigService.getEndpointFor('api/employee-2-jobs')}/${id}`);
  }

  update(employee2Job: Employee2Job): Observable<Employee2Job> {
    return this.http.put<Employee2Job>(this.applicationConfigService.getEndpointFor('api/employee-2-jobs'), employee2Job);
  }

  // deleteJob(id: number): Observable<any> {
  //   return this.http.delete(`${this.applicationConfigService.getEndpointFor('api/jobs')}/${id}`);
  // }

  // create(job: Job): Observable<Job> {
  //   return this.http.post<Job>(this.applicationConfigService.getEndpointFor('api/jobs'), job);
  // }
}
