import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { AuthService } from '../../../services/auth.service';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  imports: [CommonModule, ButtonModule, CheckboxModule, ToastModule,InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  loginForm!: FormGroup;
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private service: MessageService,
    private fb: FormBuilder
  ) {}
 
   ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

  }

  onSubmit() {
    if (this.loginForm.invalid) {
    this.loginForm.markAllAsTouched(); // Trigger validation display

    if (this.loginForm.get('email')?.hasError('required')) {
      this.service.add({ severity: 'error', summary: 'Validation', detail: 'Email is required' });
    }

    if (this.loginForm.get('password')?.hasError('required')) {
      this.service.add({ severity: 'error', summary: 'Validation', detail: 'Password is required' });
    }

    return;
  }else{
    this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          this.service.add({ severity: 'success', summary: 'Success', detail: 'Login successful' });
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          this.service.add({
            severity: 'error',
            summary: 'Login Failed',
            detail: err.error?.message || 'Invalid login credentials'
          });
          // this.error = err.error?.message || 'Login failed';
        }
      });
      }
  }
  
  

}
