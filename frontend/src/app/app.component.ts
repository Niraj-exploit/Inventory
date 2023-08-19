import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private router: Router, private toastr: ToastrService) {
    this.toastr.toastrConfig.positionClass = 'toast-bottom-right';
  }

  isLoginPage(): boolean {
    return this.router.url === '/login';
  }
   
}
