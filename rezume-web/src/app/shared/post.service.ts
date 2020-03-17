import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Post } from './post.model';

@Injectable({
  providedIn: 'root'
})


export class PostService {

  // Attribut à ajouter pour les fonctions ne demandant pas de JWT
  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http: HttpClient) { }

  getAllPost() {
    return this.http.get(environment.apiBaseUrl + '/getallpost');
  }

  addPost(post: Post) {
    return this.http.post(environment.apiBaseUrl + '/createpost', post);
  }

  getCompanyPost() {
    return this.http.get(environment.apiBaseUrl + '/getcompanypost');
  }
}
