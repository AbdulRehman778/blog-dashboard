import { Injectable } from '@angular/core';
import {
  HttpHandler,
  HttpInterceptor,
  HttpInterceptorFn,
  HttpRequest
} from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  
  const authService = inject(AuthService);
   if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next(authReq);
    }
  }
  return next(req);
};