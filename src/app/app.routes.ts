import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './auth/dashboard/dashboard.component';
import { RegisterComponent } from './auth/register/register.component';
import { authGuard } from './auth.guard';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { PhoneLoginComponent } from './auth/phone-login/phone-login.component';
import { VerifyEmailComponent } from './auth/verify-email/verify-email.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'phone-login', component: PhoneLoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email', component: VerifyEmailComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
  },
];
