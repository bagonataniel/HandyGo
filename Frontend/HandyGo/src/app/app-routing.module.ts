import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { TestComponent } from './test/test.component';
import { MainComponent } from './pages/main/main.component';
import { authGuard } from './auth.guard';
import { loginGuard } from './login.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent, canActivate: [loginGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [loginGuard]},
  { path: 'test', component: TestComponent },
  { path: 'home', component: MainComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '' }, // This has to be at the bottom, otherwise it would override all routes below it!
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }