import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';
import { PostListComponent } from './pages/post-list/post-list.component';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { AuthGuard } from './core/auth.guard';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'posts', pathMatch: 'full' },
      { path: 'posts', component: PostListComponent },
      { path: 'posts/create', component: CreatePostComponent }
    ]
  },
];
