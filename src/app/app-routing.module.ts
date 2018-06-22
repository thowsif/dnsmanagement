import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared/auth.guard';
import { LoginComponent } from './login/login.component';
import { DashboardComponent }from './dashboard/dashboard.component';
import { SignupComponent } from './signup/signup.component';


const routes: Routes = [
  { path: '', component:DashboardComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent},
  { path: 'dashboard', component:DashboardComponent,canActivate: [AuthGuard]},
  { path: 'signup', component: SignupComponent },    
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: [],

})
export class AppRoutingModule { }
