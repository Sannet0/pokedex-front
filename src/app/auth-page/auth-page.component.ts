import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent {

  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

  centered = false;
  disabled = false;
  unbounded = false;

  radius: number;
  color: string;

  isRegistration = false;

  loginForm = this.formBuilder.group({
    login: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)])
  });

  registrationForm = this.formBuilder.group({
    login: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)]),
    repPassword: new FormControl('', [Validators.required, Validators.minLength(4)])
  });

  login(): void {
    if (this.loginForm.valid) {
      const { login, password } = this.loginForm.value;
      const trimmedForm = {
        login: login.trim(),
        password: password.trim()
      };

      if ((trimmedForm.login && trimmedForm.password) && this.loginForm.valid) {
        this.loginForm.reset();
        this.authService.login(trimmedForm.login, trimmedForm.password);
      }
    }
  }

  registration(): void {
    if (this.registrationForm.valid) {
      const { login, password, repPassword } = this.registrationForm.value;
      const trimmedForm = {
        login: login.trim(),
        password: password.trim(),
        repPassword: repPassword.trim()
      };

      if (((trimmedForm.login && trimmedForm.password) && trimmedForm.repPassword === trimmedForm.password) && this.registrationForm.valid) {
        this.loginForm.reset();
        this.authService.registration(trimmedForm.login, trimmedForm.password, trimmedForm.repPassword);
      }
    }
  }

  setIsRegistration(bool: boolean): void {
    this.isRegistration = bool;
  }

}
