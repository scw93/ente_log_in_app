import { Employee } from '../employee/employee.model';
import { Job } from '../job/job.model';

export class Employee2Job {
  // public id?: number;
  // public jobTitle?: string;

  constructor(public id?: number, public job?: Job, public employee?: Employee) {}
}
