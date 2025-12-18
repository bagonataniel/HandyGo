import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { TestComponent } from './test/test.component';
import { MainComponent } from './pages/main/main.component';
import { loginGuard } from './guards/login.guard';
import { authGuard } from './guards/auth.guard';
import { isVerifiedGuard } from './guards/is-verified.guard';
import { VerificationComponent } from './pages/verification/verification.component';


import { AboutComponent } from './pages/about/about.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent, canActivate: [loginGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [loginGuard]},
  { path: 'test', component: TestComponent },
  { path: 'home', component: MainComponent, canActivate: [authGuard, isVerifiedGuard] },
  { path: 'verification', component: VerificationComponent, canActivate: [authGuard] },
  { path: 'home', component: MainComponent, canActivate: [authGuard] },
  { path: 'about', component: AboutComponent },
  { path: '**', redirectTo: '' }, // This has to be at the bottom, otherwise it would override all routes below it!
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ scrollPositionRestoration: 'top'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }