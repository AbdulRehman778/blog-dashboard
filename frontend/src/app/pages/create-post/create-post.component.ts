import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FluidModule } from 'primeng/fluid';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-create-post',
  imports: [CommonModule, ToastModule, ReactiveFormsModule, InputTextModule, FluidModule, ButtonModule, SelectModule, FormsModule, TextareaModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.scss'
})
export class CreatePostComponent {

  postForm!: FormGroup;
  user = JSON.parse(localStorage.getItem('user') || '{}');



  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private router: Router,
    private service: MessageService,

  ) {
    
  }

  ngOnInit(){
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
      author: [{ value: '', disabled: true }]  
    });
    this.postForm.patchValue({
      author: this.user.name
    });
  }

  onSubmit() {
    if (this.postForm.valid) {
      this.postService.createPost(this.postForm.value).subscribe({
        next: () => {
          this.router.navigate(['/dashboard']); 
        },
        error: (err: any) => {
          this.service.add({ severity: 'error', summary: 'Error', detail: "Something went wrong" });
          
        }
      });
    }else{
      this.postForm.markAllAsTouched();
      this.service.add({ severity: 'error', summary: 'Validation Error', detail: 'Please fill out the form correctly.' });

        return;
    
    }
  }

}
