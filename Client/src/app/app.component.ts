import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  //http = Inject(HttpClient);
  title = 'Client';
  users:any;
  constructor(private http:HttpClient){
    debugger
    this.http.get('http://localhost:5084/api/users').subscribe({
      next:(response:any) =>{
        this.users = response;
        console.log(this.users);

      },
      error: (error) => {
        console.error('Error fetching data:', error);
      }
    })
  }
  

  // ngOnInit(): void {
  //   debugger;
  //   this.http.get('http://localhost:5084/api/users').subscribe({
  //     next:(response:any) => {
  //       this.users = response
  //     },
  //     error: (error:any) => {
  //       console.log(error);
  //     },
  //     complete: () =>{
  //       console.log('Request has completed')
  //     }
  //   })
  // } 
}
