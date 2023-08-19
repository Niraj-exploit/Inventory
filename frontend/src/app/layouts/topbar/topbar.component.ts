import { Component } from '@angular/core';
import{Router} from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';


@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent {
  constructor(private router: Router,private authService:AuthService ) {
  }
  logout() {
    this.authService.clearToken(); 
    this.authService.clearuserRoles(); 
    this.router.navigate(['/login']);
  }    
}
