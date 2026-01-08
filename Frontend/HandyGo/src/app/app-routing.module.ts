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
import { ContactComponent } from './pages/contact/contact.component';


import { AboutComponent } from './pages/about/about.component';
import { ServicesComponent } from './pages/services/services.component';
import { UsersComponent } from './pages/users/users.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ChatSideNavComponent } from './layout/chat-side-nav/chat-side-nav.component';
import { TermsComponent } from './pages/terms/terms.component';
import { RightsComponent } from './pages/rights/rights.component';
import { ChatPanelComponent } from './layout/chat-panel/chat-panel.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent, canActivate: [loginGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [loginGuard]},
  { path: 'test', component: TestComponent },
  { path: 'home', component: MainComponent, canActivate: [authGuard, isVerifiedGuard] },
  { path: 'verification', component: VerificationComponent, canActivate: [authGuard] },
  { path: 'home', component: MainComponent, canActivate: [authGuard] },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'services/:id', component: ServicesComponent, canActivate: [authGuard, isVerifiedGuard] },
  { path: 'users/:id', component: UsersComponent, canActivate: [authGuard, isVerifiedGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard, isVerifiedGuard] },
  { path: 'chat-test', component: ChatSideNavComponent, canActivate: [authGuard, isVerifiedGuard] },
  { path: 'terms', component: TermsComponent },
  { path: 'rights', component: RightsComponent },
  { path: 'chat-test', component: ChatSideNavComponent, canActivate: [authGuard, isVerifiedGuard] },
  { path: '**', redirectTo: '' }, // This has to be at the bottom, otherwise it would override all routes below it!
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ scrollPositionRestoration: 'top'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }