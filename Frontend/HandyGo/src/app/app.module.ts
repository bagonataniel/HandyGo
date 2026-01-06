import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { HeroComponent } from './sections/hero/hero.component';
import { WhyChooseComponent } from './sections/why-choose/why-choose.component';
import { OurServicesComponent } from './sections/our-services/our-services.component';
import { GetStartedComponent } from './sections/get-started/get-started.component';
import { LoginComponent } from './pages/login/login.component';

import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {MatSidenavModule} from '@angular/material/sidenav';
import { HttpClientModule } from '@angular/common/http';
import { provideHttpClient } from '@angular/common/http';
import { RegisterComponent } from './pages/register/register.component';
import { TestComponent } from './test/test.component';
import { MainComponent } from './pages/main/main.component'; // TestComponent has to be removed later!
import {MatMenuModule} from '@angular/material/menu';
import { VerificationComponent } from './pages/verification/verification.component';
import { AboutComponent } from './pages/about/about.component';
import { ChatSideNavComponent } from './layout/chat-side-nav/chat-side-nav.component';
import { CommonModule } from '@angular/common';
import {MatListModule} from '@angular/material/list';
import { ContactComponent } from './pages/contact/contact.component';
import { ServicesComponent } from './pages/services/services.component';
import { UsersComponent } from './pages/users/users.component';
import { ProfileComponent } from './pages/profile/profile.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    HeroComponent,
    WhyChooseComponent,
    OurServicesComponent,
    GetStartedComponent,
    LoginComponent,
    RegisterComponent,
    TestComponent,
    MainComponent,
    VerificationComponent,
    AboutComponent,
    ChatSideNavComponent,
    ContactComponent,
    ServicesComponent,
    UsersComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconButton,
    MatMenuModule,
    MatSidenavModule,
    CommonModule,
    MatListModule
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
