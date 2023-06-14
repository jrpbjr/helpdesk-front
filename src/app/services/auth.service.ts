import { Injectable } from '@angular/core';
import { Crendenciais } from '../models/credenciais';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../config/apit.config';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtService: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient) { }

  authenticate(creds: Crendenciais){
    return this.http.post(`${API_CONFIG.baseUrl}/login`, creds, {
      observe: 'response',
      responseType: 'text'
    });
  }
    sucessfullLogin(authToken: string){
      localStorage.setItem('token',authToken);
    }

    isAuthenticated(){
      let token =localStorage.getItem('token')
      if(token != null){
        return !this.jwtService.isTokenExpired(token);
      }
      return false;
    }
}
