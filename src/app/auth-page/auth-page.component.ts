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

  centered = false;
  disabled = false;
  unbounded = false;

  radius: number;
  color: string;

  login(): void {
    const { login, password } = this.loginForm.value;
    if ((login.trim() && password.trim())) {
      if ((!this.loginForm.controls['login'].invalid && !this.loginForm.controls['password'].invalid)) {
        this.loginForm.reset();
        this.authService.login(login.trim(), password.trim());
      }
    }
  }

  registration(): void {
    const { login, password, repPassword } = this.registrationForm.value;
    if ((login.trim() && password.trim()) && repPassword.trim() === password.trim()) {
      if ((!this.registrationForm.controls['login'].invalid && !this.registrationForm.controls['password'].invalid && !this.registrationForm.controls['repPassword'].invalid)) {
        this.loginForm.reset();
        this.authService.registration(login.trim(), password.trim(), repPassword.trim());
      }
    }
  }

  setIsRegistration(bool: boolean): void {
    this.isRegistration = bool;
  }

}
