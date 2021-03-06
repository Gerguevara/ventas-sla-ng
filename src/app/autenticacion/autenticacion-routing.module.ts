import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ForgotComponent } from './components/forgot/forgot.component';
import { EmailVerificationComponent } from './components/email-verification/email-verification.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { TwofaComponent } from '../twofa/twofa.component';
import { TwoFaGuard } from '@guards/two-fa.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  // Ruta de redireccionamiento para verificar email con token
  {
    path: 'signup/email-verification/:id/:hash',
    component: EmailVerificationComponent
  },
  {
    path: 'forgot',
    component: ForgotComponent
  },
  {
    path: 'reset-password/:token',
    component: ResetPasswordComponent
  },
  {
    path: '**', pathMatch: 'full', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutenticacionRoutingModule { }
