import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  selectedUser: User = {
    fullName: '',
    email: '',
    status: '',
    password: '',
    confirmPassword: ''
  };

  //Attribut à ajouter pour les fonctions ne demandant pas de JWT
  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http: HttpClient) { }

  //HTTP methods

  postUser(user: User) {
    return this.http.post(environment.apiBaseUrl+'/register', user, this.noAuthHeader)
  }

  //Fonction générant un token en fonction de Credentials
  login(authCredentials) {
    return this.http.post(environment.apiBaseUrl + '/authenticate', authCredentials, this.noAuthHeader);
  }

  //Fonction récupérant le profil en fonction du token
  getUserProfile() {
    return this.http.get(environment.apiBaseUrl + '/userProfile');
  }

  //Helper Methods

  //Fonction stockant le token généré par le login
  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  //Fonction pour récupérer le token
  getToken() {
    return localStorage.getItem('token');
  }

  //Fonction pour supprimer le token
  deleteToken() {
    localStorage.removeItem('token');
  }

  //Fonction pour récupérer le payload (les infos du user) à partir du token
  getUserPayload() {
    var token = this.getToken();
    if(token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    } else {
      return null;
    }
  }

  //Fonction pour vérifier si le user est login
  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload) {
      return userPayload.exp > Date.now() / 1000; //Return true or false
    } else {
      return false;
    }
  }
}
