import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { Message } from './message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  // Attribut à ajouter pour les fonctions ne demandant pas de JWT
  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http: HttpClient) { }

  getMessages() {
    return this.http.get(environment.apiBaseUrl + '/getusermessages');
  }


}
