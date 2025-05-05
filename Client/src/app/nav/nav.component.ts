import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-nav',
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
   accountService = inject(AccountService);
   private route = inject(Router);
   private toastr = inject(ToastrService)
  loginModel:any={}
  

  Login(){
    this.accountService.login(this.loginModel).subscribe({
      next: response =>{
        this.route.navigateByUrl('/members');
        this.toastr.success('Logged in successfully');
      },
      error: error => this.toastr.error(error.error)
    })

  }

  Logout(){
    this.accountService.logout();
    this.route.navigateByUrl('/');
  }

}
