import { HttpClient } from '@angular/common/http';
import { Component, inject, Inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from "./nav/nav.component";
import { AccountService } from './_services/account.service';
import { User } from './_models/user';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  private accountService = inject(AccountService);
  ngOnInit(): void {
    this.setCurrentUser()
  }
  //http = Inject(HttpClient);
 
  title = 'Client';
  
  // constructor(private accountService:AccountService){
  //   this.setCurrentUser();
  // }
  
  setCurrentUser(){
    debugger;
    const userString = localStorage.getItem('user');
    if(!userString) return;
    const user = JSON.parse(userString)
    if(this.accountService && this.accountService.currentUser){
      this.accountService.currentUser.set(user)
    }
   
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
