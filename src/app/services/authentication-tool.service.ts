import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationToolService {

  constructor(
    private cookieService: CookieService
    ) { }

  public async addUserIdInCookie (userId: number) {
    this.cookieService.delete('fantasy-user-id')

    try {
      this.cookieService.set('fantasy-user-id', userId.toString())
    }
    catch(e) {
      throw e
    }
  }

  public async retrieveUserIdFromCookie() {
    return this.cookieService.get('fantasy-user-id')
  }

  public async deleteCookie() {
    console.log("I am deleting all cookies::::")
    this.cookieService.deleteAll('fantasy-user-id')
  }
}
