import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { LayoutService } from '../../services/layout.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  items!: MenuItem[];
  user: any = {};
  dropdownOpen = false;
  isBrowser = false;

   constructor(
    public layoutService: LayoutService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
  
  ngOnInit() {
      if (this.isBrowser) {
        const userData = localStorage.getItem('user');
        if (userData) {
          this.user = JSON.parse(userData);
        }
      }
    }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  logout() {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
    this.router.navigate(['/login']);
  }
    
}
