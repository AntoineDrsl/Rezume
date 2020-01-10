import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Company } from './company.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  selectedCompany: Company = {
    company_name: '',
    email: '',
    description: '',
    password: '',
    confirmPassword: ''
  };


  //Attribut à ajouter pour les fonctions ne demandant pas de JWT
  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http: HttpClient) { }

  postCompany(company: Company) {
    return this.http.post(environment.apiBaseUrl + '/registercompany', company, this.noAuthHeader);
  }

  //Fonction générant un token en fonction de Credentials
  login(authCredentials) {
    return this.http.post(environment.apiBaseUrl + '/authenticate', authCredentials, this.noAuthHeader);
  }

   //Fonction récupérant le profil en fonction du token
   getCompanyProfile() {
    return this.http.get(environment.apiBaseUrl + '/companyprofile');
  }

  getCompanyProfileId(id){
    return this.http.get(environment.apiBaseUrl + '/companyprofile/' + id);
  }

  // Fonction stockant le token généré par le login
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

  //Fonction pour récupérer le payload (les infos de l'entreprise) à partir du token
  getCompanyPayload() {
    var token = this.getToken();
    if(token) {
      var companyPayload = atob(token.split('.')[1]);
      return JSON.parse(companyPayload);
    } else {
      return null;
    }
  }

  //Fonction pour vérifier si le student est login
  isLoggedIn() {
    var companyPayload = this.getCompanyPayload();
    if (companyPayload) {
      return companyPayload.exp > Date.now() / 1000; //Return true or false
    } else {
      return false;
    }
  }


  addFavorite(id){
    return this.http.get(environment.apiBaseUrl + '/addfavorite/' + id);
  }

  removeFavorite(id){
    return this.http.get(environment.apiBaseUrl + '/removefavorite/' + id);
  }
}
