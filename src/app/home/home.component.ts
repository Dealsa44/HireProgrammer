import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit{
  comments: any[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.fetchComments();
  }

  fetchComments(): void {
    this.http.get('https://jsonplaceholder.typicode.com/comments' ).subscribe({
      next: (data:any) => {
        this.comments = data.slice(0, 5);
        this.isLoading = false;
      },
      error: (err) =>{
        this.errorMessage = 'Failed to load  comments';
        this.isLoading = false;
      },
    });
  }
}