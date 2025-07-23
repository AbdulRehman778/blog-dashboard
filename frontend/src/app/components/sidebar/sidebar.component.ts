import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenuItemComponent } from "../menuitem/menuitem.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, MenuItemComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
 model: MenuItem[] = [];

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [{ label: 'Posts', icon: 'pi pi-fw pi-id-card', routerLink: ['/dashboard/posts'] }]
            },
         
        ];
    }
}
