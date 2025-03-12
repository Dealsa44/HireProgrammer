import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
})
export class ServicesComponent implements OnInit {
  posts: any[] = [];
  photos: any[] = [];
  isLoadingPosts = true;
  isLoadingPhotos = true;
  errorMessagePosts = '';
  errorMessagePhotos = '';

  constructor(private http: HttpClient) {}

    ngOnInit() : void {
      this.fetchPosts();
      this.fetchPhotos();
    }

    fetchPosts(): void {

      this.http.get('https://jsonplaceholder.typicode.com/posts').subscribe({
        next: (data: any) => {
          this.posts = data.slice(0,4);
          this.isLoadingPosts = false;
        },
        error: (err) => {
          this.errorMessagePosts = `CAN'T LOAD THE POSTS`;
          this.isLoadingPosts = false;
        },
      });

    }

    fetchPhotos(): void {

      const imageUrls = [
        `https://picsum.photos/150/150?random=1`,
        `https://picsum.photos/150/150?random=2`,
        `https://picsum.photos/150/150?random=3`,
        `https://picsum.photos/150/150?random=4`,
      ];


      this.photos = imageUrls.map((url, index) => ({
        id: index + 1,
        title: `Project ${index +1}`,
        thumbnailUrl: url,
      }));

      this.isLoadingPhotos = false;
    }
  
}