import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationToolService } from 'src/app/services/authentication-tool.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userEmailId = ''
  userPassphrase = ''
  loginFailed = false

  constructor(
    private userService: UserServiceService,
    private router: Router,
    private authenticationService: AuthenticationToolService
  ) { }

  ngOnInit(): void {
    this.authenticationService.deleteCookie()
  }

  async onSubmit() {
    this.userService.userLogin(this.userEmailId, this.userPassphrase)
    .subscribe({
      next: resp => {
        if(resp.body?.userId != null) {
          console.log('User login Response:::: ' +resp.body.userId)
          this.router.navigate(['/fantasy/home'])
          this.authenticationService.addUserIdInCookie(resp.body.userId)
        }
        else {
          this.authenticationService.deleteCookie()
          this.loginFailed = true
        }
      },
      error: () => {
        this.loginFailed = true
      }
    })
  }

}
