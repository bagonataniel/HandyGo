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
import { MainComponent } from './pages/main/main.component'; 
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
import { TermsComponent } from './pages/terms/terms.component';
import { RightsComponent } from './pages/rights/rights.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ChatPanelComponent } from './layout/chat-panel/chat-panel.component';
import { MatDialogModule, MatDialogTitle } from '@angular/material/dialog';
import { Error404Component } from './pages/error404/error404.component';
import { MyServicesComponent } from './pages/my-services/my-services.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { MatSelectModule } from '@angular/material/select';
import {MatSliderModule} from '@angular/material/slider';
import { ServiceCreatorComponent } from './pages/service-creator/service-creator.component';
import { BookingsComponent } from './pages/bookings/bookings.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';


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
    MainComponent,
    VerificationComponent,
    AboutComponent,
    ChatSideNavComponent,
    ContactComponent,
    ServicesComponent,
    UsersComponent,
    ProfileComponent,
    TermsComponent,
    RightsComponent,
    ChatPanelComponent,
    Error404Component,
    MyServicesComponent,
    EditProfileComponent,
    ServiceCreatorComponent,
    BookingsComponent,
    
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
    MatListModule,
    MatSnackBarModule,
    MatDialogTitle,
    MatDialogModule,
    MatSelectModule,
    MatSliderModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatTableModule,
],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
