import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LaunchComponent } from './components/launch/launch.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SubmitTeamComponent } from './components/submit-team/submit-team.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'bnpl-fantasy', pathMatch: 'full'
  },
  {
    path: 'bnpl-fantasy', component: LaunchComponent
  },
  {
    path: 'fantasy',
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'submit-team', component: SubmitTeamComponent }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
