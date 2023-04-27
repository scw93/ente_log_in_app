import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Job } from './job.model';
import { ApplicationConfigService } from 'app/core/config/application-config.service';

@Injectable({ providedIn: 'root' })
export class JobService {
  constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  getAllJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(this.applicationConfigService.getEndpointFor('api/jobs'));
  }

  deleteJob(id: number): Observable<any> {
    return this.http.delete(`${this.applicationConfigService.getEndpointFor('api/jobs')}/${id}`);
  }

  update(id: number, job: Job): Observable<Job> {
    return this.http.put<Job>(`${this.applicationConfigService.getEndpointFor('api/jobs')}/${id}`, job);
  }

  create(job: Job): Observable<Job> {
    return this.http.post<Job>(this.applicationConfigService.getEndpointFor('api/jobs'), job);
  }
}
