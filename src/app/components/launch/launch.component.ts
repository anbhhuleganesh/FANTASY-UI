import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationToolService } from 'src/app/services/authentication-tool.service';

@Component({
  selector: 'app-launch',
  templateUrl: './launch.component.html',
  styleUrls: ['./launch.component.css']
})
export class LaunchComponent implements OnInit {

  constructor(
    private router: Router,
    private authenticationService: AuthenticationToolService
  ) { }

  ngOnInit(): void {
    this.authenticationService.deleteCookie()
  }

  onLoginClick() {
    this.router.navigate(['/fantasy/login'])
  }

  onRegisterClick() {
    this.router.navigate(['/fantasy/register'])
  }

}
