import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http'
import { UserLoginRequest } from '../models/user-login-request';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(protected http: HttpClient) { }

  public userLogin(emailId: string, passphrase: string): Observable<HttpResponse<User>> {
    console.log("I am inside userLogin service")
    const userLoginURL = environment.bnplAPIRoot + '/validate/user'
    console.log(userLoginURL)
    const loginRequest = this.buildUserLoginRequest(emailId, passphrase)
    return this.http.post<User>(userLoginURL, loginRequest, {observe: 'response'})
    .pipe(
      catchError(err => throwError(err))
    )
  }

  private buildUserLoginRequest(emailId: string, passphrase: string) {
    const request: UserLoginRequest = {}
    request.emailId = emailId
    request.passphrase = passphrase
    return request
  }

  public registerUser(user: User): Observable<HttpResponse<User>> {
    const registerUserURL = environment.bnplAPIRoot + '/create/user'
    return this.http.post<User>(registerUserURL, user, {observe: 'response'})
    .pipe(
      catchError(err => throwError(err))
    )
  }
}
