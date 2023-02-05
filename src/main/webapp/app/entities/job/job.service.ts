import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Job } from './job.model';
import { ApplicationConfigService } from 'app/core/config/application-config.service';

@Injectable({ providedIn: 'root' })
export class JobService {
  constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  getAllJobs(): Observable<{}> {
    return this.http.get(this.applicationConfigService.getEndpointFor('api/jobs'));
  }

  deleteJob(id: number): Observable<any> {
    return this.http.delete(`${this.applicationConfigService.getEndpointFor('api/jobs')}/${id}`);
  }
}
