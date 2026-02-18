import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { environment } from '../../environments/environment';
import { firstValueFrom } from 'rxjs';
import { Branch } from '../interfaces/branch';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private httpClient = inject(HttpClient);
  
  async login(email:string, password:string) : Promise<{token:string}> {
    const observable = this.httpClient.post<{token:string}>(`${environment.apiURl}/members/login/`, {"email":email, "password":password});
    return firstValueFrom(observable);
  }

  async get_user(authToken:string) : Promise<User> {
    const observable = this.httpClient.get<User>(`${environment.apiURl}/members/me/`, {
      headers: new HttpHeaders('').set('Authorization', `Token ${authToken}`)
    });
    return firstValueFrom(observable);
  }

  async register(user:User) : Promise<User> {
    const observable = this.httpClient.post<User>(`${environment.apiURl}/members/signup/`, user);
    return firstValueFrom(observable);
  }

  async get_branches() : Promise<Branch[]> {
    const observable = this.httpClient.get<Branch[]>(`${environment.apiURl}/members/branches`);
    return firstValueFrom(observable);
  }  
}
