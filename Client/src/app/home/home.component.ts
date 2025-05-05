import { Component, inject, OnInit } from '@angular/core';
import { RegisterComponent } from "../register/register.component";
import { HttpClient } from '@angular/common/http';
import { first, firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [RegisterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  http = inject(HttpClient);
  ngOnInit(): void {
    this.getUsers();
  }
  users : any;
  isRegisterForm:boolean = false;
  registerationToggler(){
    this.isRegisterForm = !this.isRegisterForm;
  }

  cancelRegisteration(event:boolean){
    this.isRegisterForm = event;

  }
  getUsers(){
    debugger;
    this.http.get('http://localhost:5084/api/users').subscribe({
      next: response=>this.users = response,
      error: error=> console.log(error),
      complete : () => console.log('completed')
    })
  }

  // async getUsers() {
  //   try {
  //     debugger
  //     console.log('Starting API call');
  //     const response = await firstValueFrom(this.http.get('http://localhost:5084/api/users'));
  //     console.log('Response received:', response);
  //     this.users = response;
  //   } catch (error) {
  //     console.error('Error occurred:', error);
  //   }
  // }
}
