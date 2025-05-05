import { Component, EventEmitter, inject, Input, input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  private accountService = inject(AccountService);
  ngOnInit(): void {
    debugger;
    console.log(this.usersFromHomeComponent)
  }
 model:any={}
 @Input () usersFromHomeComponent : any;
 @Output() cancelRegister = new EventEmitter();
  register(){
    this.accountService.register(this.model).subscribe({
      next:response=> {
        console.log(response)
        this.cancel()
      },
      error: error => console.log(error),
    })
  }
  cancel(){
    this.cancelRegister.emit(false)
  }

}
