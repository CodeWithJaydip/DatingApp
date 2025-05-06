import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-error',
  imports: [],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css'
})
export class ErrorComponent {
  private http = inject(HttpClient)
  baseUrl = 'http://localhost:5084/api/';

  get400Error(){
    this.http.get(this.baseUrl + 'Buggy/bad-request').subscribe({
      next: response=> console.log(response),
      error: error => console.log(error)
    })
  }

  get401Error(){
    this.http.get(this.baseUrl + 'Buggy/bad-request').subscribe({
      next: response=> console.log(response),
      error: error => console.log(error)
    })
  }

  get404Error(){
    this.http.get(this.baseUrl + 'Buggy/not-found').subscribe({
      next: response=> console.log(response),
      error: error => console.log(error)
    })
  }

  get500Error(){
    this.http.get(this.baseUrl + 'Buggy/server-error').subscribe({
      next: response=> console.log(response),
      error: error => console.log(error)
    })
  }

  getValidationError(){
    this.http.post(this.baseUrl + 'Account/register',{}).subscribe({
      next: response=> console.log(response),
      error: error => console.log(error)
    })
  }
}
