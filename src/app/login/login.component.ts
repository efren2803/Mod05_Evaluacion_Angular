import { Component, inject, signal } from '@angular/core';
import { AutenticacionService } from '../services/login/autenticacion.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { credentials } from './credentials';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  authService = inject(AutenticacionService);
  router = inject(Router);

  isLoading = signal(false);
  errorMessage = signal('');

  suscLogin?: Subscription;

  credencial: credentials = {
    nombreUsuario: "",
    password: ""
  }

  loginForm = new FormGroup({
    nombreUsuario: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(3)])
  });

  async onSubmit() {
    if (this.loginForm.invalid) return;

    try {
      this.isLoading.set(true);
      this.errorMessage.set('');

      this.credencial = this.loginForm.getRawValue() as credentials;

      this.suscLogin = this.authService.login(this.credencial).subscribe(lgn => this.procesarLogin(lgn));
    }
    catch (error: any) {
      this.errorMessage.set(error.error?.message || 'Error de autenticación');
      console.error('Login error:', error);
    }
    finally {
      this.isLoading.set(false);
    }
  }

  procesarLogin(lgn: any): void {
    console.log("Procesar Login");
    console.log(lgn);
    localStorage.setItem('auth_token', lgn.token);
    this.router.navigate(['/dashboard']);
  }
}
