import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private http: HttpClient) {}
  private apiUrl = 'http://localhost:3000/api';

  getAllPosts(): Observable<any[]> {
  return this.http.get<{ posts: any[] }>(`${this.apiUrl}/posts`).pipe(
    map(response => response.posts ?? [])
  );
  }
  // getPosts(page: number = 1, pageSize: number = 5): Observable<any> {
  //   return this.http.get(`http://localhost:3000/api/posts?page=${page}&limit=${pageSize}`);
  // }

 
  getPosts(page: number, limit: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/posts?page=${page}&limit=${limit}`);
  }

  createPost(postData: { title: string; body: string }) {
  return this.http.post(`${this.apiUrl}/posts/create`, postData);
}

}
