import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Student } from './student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  selectedStudent: Student = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  // Attribut à ajouter pour les fonctions ne demandant pas de JWT
  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http: HttpClient) { }

  // HTTP methods

  postStudent(student: Student) {
    return this.http.post(environment.apiBaseUrl + '/register', student, this.noAuthHeader);
  }

  // Fonction générant un token en fonction de Credentials
  login(authCredentials) {
    return this.http.post(environment.apiBaseUrl + '/authenticate', authCredentials, this.noAuthHeader);
  }

  // Fonction récupérant le profil en fonction du token
  getStudentProfile() {
    return this.http.get(environment.apiBaseUrl + '/studentprofile');
  }

  // Helper Methods

  // Fonction stockant le token généré par le login
  setToken(token: string) {
    localStorage.setItem('token_student', token);
  }

  // Fonction pour récupérer le token
  getToken() {
    return localStorage.getItem('token_student');
  }

  // Fonction pour supprimer le token
  deleteToken() {
    localStorage.removeItem('token_student');
  }

  // Fonction pour récupérer le payload (les infos du student) à partir du token
  getStudentPayload() {
    var token = this.getToken();
    if(token) {
      var studentPayload = atob(token.split('.')[1]);
      return JSON.parse(studentPayload);
    } else {
      return null;
    }
  }

  // Fonction pour vérifier si le student est login
  isLoggedIn() {
    var studentPayload = this.getStudentPayload();
    if (studentPayload) {
      return studentPayload.exp > Date.now() / 1000; // Return true or false
    } else {
      return false;
    }
  }
}
