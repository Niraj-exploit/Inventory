import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService, private toastr:ToastrService) {}
  user: any={};
  loginUser(){
    this.authService.login(this.user).subscribe(
      (response: any)=>{
        if(response.success){ 
         localStorage.setItem('token', (response.token));
         localStorage.setItem('userRoles', (response.userRoles));
         this.router.navigate(['/']);
         this.toastr.success(response.msg, 'Success');
        }else{
          this.toastr.error(response.message, "Error")
        }
      },
      (error: any)=>{
        console.log(error);
        
      }
    )
  }

  ngOnInit() {  }
}
