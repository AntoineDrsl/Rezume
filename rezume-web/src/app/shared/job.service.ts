import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Job } from './job.model';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  selectedCV: Job = {
    sector: '',
    description: '',
    experience: '',
    degrees: ['']
  };

  //Attribut à ajouter pour les fonctions ne demandant pas de JWT
  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http: HttpClient) { }

  //HTTP méthods

  postFile(formData) {
    return this.http.post<any>(environment.apiBaseUrl + '/uploadjobimage', formData);
  }

  postJob(job: Job) {
    return this.http.post(environment.apiBaseUrl + '/createjob', job);
  }

  getAllJob() {
    return this.http.get(environment.apiBaseUrl + '/getalljob');
  }
}
