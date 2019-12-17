import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { CV } from './cv.model';

@Injectable({
  providedIn: 'root'
})
export class CvService {

  selectedCV: CV = {
    age: '',
    research: '',
    experiences: [''],
    degrees: ['']
  };

  //Attribut à ajouter pour les fonctions ne demandant pas de JWT
  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http: HttpClient) { }

    //HTTP methods

    postFile(formData) {
      return this.http.post<any>(environment.apiBaseUrl + '/uploadimage', formData)
    }

    postCV(cv: CV) {
      return this.http.post(environment.apiBaseUrl + '/createcv', cv)
    }
}
