import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthPageComponent } from './auth-page.component';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { AngularToastifyModule } from 'angular-toastify';

@NgModule({
  declarations: [
    AuthPageComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatRippleModule,
    AngularToastifyModule
  ],
  exports: [
    AuthPageComponent
  ]
})
export class AuthPageModule { }
