import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Hashtag } from './hashtag.model';

@Injectable({
  providedIn: 'root'
})


export class HashtagService {

  // Attribut à ajouter pour les fonctions ne demandant pas de JWT
  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http: HttpClient) { }

  getAllHashtag() {
    return this.http.get(environment.apiBaseUrl + '/hashtag');
  }

  addHashtag(hashtag: Hashtag) {
    return this.http.post(environment.apiBaseUrl + '/addhashtag', hashtag);
  }

}
