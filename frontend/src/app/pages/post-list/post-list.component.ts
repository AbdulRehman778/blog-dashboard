import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { isPlatformBrowser } from '@angular/common';
import { PostService } from '../../services/post.service';
import { Table, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';

@Component({
  imports: [CommonModule, AgGridModule, TableModule, ButtonModule],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss'
})
export class PostListComponent {
rowData: any[] = [];
  columnDefs = [
    { field: 'title' },
    { field: 'excerpt' },
    { field: 'author' },
    { field: 'publishedAt' }
  ];
  
  paginationPageSize = 5;
  totalRecords = 0;


  loading = true;
  constructor(private http: HttpClient,
    private router: Router,
  private postService: PostService) {
      
    }

  goToCreatePost() {
    console.log('Navigating to create post');
    this.router.navigate(['dashboard/posts/create']);
  }


  ngOnInit() {
    this.loadPostsLazy({ first: 0, rows: 5 });
    //  this.postService.getAllPosts().subscribe({
    //     next: (data) => {
    //       this.rowData = data.map(post => ({
    //         title: post.title,
    //         excerpt: post.body.substring(0, 100),
    //         author: post.author?.name || 'Unknown',
    //         publishedAt: new Date(post.createdAt).toLocaleDateString()
    //       }));
    //       this.loading = false;
    //     },
    //     error: (err) => {
    //       console.error('Error loading posts', err);
    //       this.loading = false;
    //     }
    //   });

  }
  
  loadPostsLazy(event: any) {
    this.loading = true;

    const page = event.first / event.rows + 1;
    const limit = event.rows;

    this.postService.getPosts(page, limit).subscribe({
      next: (res) => {
        this.rowData = res.posts; 
        this.totalRecords = res.totalPages * limit;

        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }


}
