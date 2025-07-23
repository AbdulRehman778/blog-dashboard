import { Component, OnInit } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { AuthService } from '../../../services/auth.service';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { ToastModule } from "primeng/toast";

@Component({
  selector: 'app-register',
  imports: [ButtonModule, CommonModule, ToastModule, CheckboxModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  name = '';
  email = '';
  password = '';
  registerForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private service: MessageService,
    
  ) {}
  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.registerForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
});

  }
  onSubmit() {
    
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: () => {
          this.service.add({ severity: 'success', summary: 'Success', detail: 'Registration successful!' });
          this.router.navigate(['/login']);
        },
        error: (err) => {
          const msg = err.error?.message || 'Registration failed';
          this.service.add({ severity: 'error', summary: 'Error', detail: msg });
        }
      });
    } else {
      this.service.add({ severity: 'error', summary: 'Validation Error', detail: 'Please fill out the form correctly.' });
    }
  }
 
}
