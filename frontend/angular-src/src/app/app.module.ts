import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { SigninComponent } from './components/signin/signin.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LandComponent } from './components/land/land.component';
import { AdminComponent } from './components/admin/admin.component';

import { AuthService } from './services/auth.service';
import { ValidateService } from './services/validate.service';
import { FlashMessagesModule } from 'angular2-flash-messages';

const appRoutes: Routes = [
  { path: '', component: LandComponent },
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'admin', component: AdminComponent },

  { path: '**', component: LandComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    RegisterComponent,
    SigninComponent,
    ProfileComponent,
    LandComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule
  ],
  providers: [
    AuthService,
    ValidateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
