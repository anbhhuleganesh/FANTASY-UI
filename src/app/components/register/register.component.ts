import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthenticationToolService } from 'src/app/services/authentication-tool.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userForm: FormGroup
  user!: User
  registrationFailed = false

  constructor(
    private fb: FormBuilder,
    private userService: UserServiceService,
    private router: Router,
    private authenticationService: AuthenticationToolService
    ) {
    this.userForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      emailId: ['', Validators.email],
      passphrase: ['']
    })
    
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.user = this.userForm.value
    this.userService.registerUser(this.user)
    .subscribe({
      next: resp => {
        if(resp.body?.userId != null) {
          this.router.navigate(['/fantasy/home'])
          this.authenticationService.addUserIdInCookie(resp.body.userId)
        }
      },
      error: () => {
        this.registrationFailed = true
      }
    })
  }

}
