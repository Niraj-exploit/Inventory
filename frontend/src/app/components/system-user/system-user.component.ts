import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AllUserService } from 'src/app/service/allUser.service';
import { AuthService } from 'src/app/service/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'; // Import NgbModal

@Component({
  selector: 'app-system-user',
  templateUrl: './system-user.component.html',
  styleUrls: ['./system-user.component.css'],
})
export class SystemUserComponent implements OnInit {
  users: any = [];
  newUser: any = {};
  selectedUser: any = { roleIds: [] };
  selectedRoleIds: number[] = [];
  isNewUser: boolean = true;
  selectedRoles = [];


  roleMappings: { id: number; name: string }[] = [
    { id: 1, name: 'ADMIN' },
    { id: 2, name: 'Editor' },
    { id: 3, name: 'User' },
    // Add more role mappings as needed
  ];

  constructor(private allUserService: AllUserService, private toastr: ToastrService, private modalService: NgbModal) {}

  ngOnInit() {
    this.fetchUsers();
  }

  registerUser() {
    this.allUserService.registerUser(this.newUser).subscribe(
      (response: any) => {
        if (response.success) {
          console.log('User Created Successfully');
          this.toastr.success(response.message, 'Success');
          this.fetchUsers();
        } else {
          this.toastr.error(response.message, 'Error');
          console.log('User already registered');
        }
      },
      (error) => {
        this.toastr.error(error.message, 'Error');
        console.error('An error occurred:', error);
      }
    );
  }
  
  updateSelectedRoles(selectedRoles: number[]) {
    this.selectedUser.roleIds = selectedRoles;
  }

  updateUser() {
    this.allUserService.updateUser(this.selectedUser.id, this.selectedUser).subscribe(
      (response: any) => {
        if (response.success) {
          console.log('User Updated Successfully');
          this.toastr.success(response.message, 'Success');
          this.fetchUsers();
        } else {
          this.toastr.error(response.message, 'Error');
          console.log('Failed to update user');
        }
      },
      (error) => {
        this.toastr.error(error.message, 'Error');
        console.error('An error occurred:', error);
      }
    );
  }
  
  
  

  

  fetchUsers(): void {
    
    this.allUserService.listUsers().subscribe(
      (res: any) => {
        console.log('API Response:', res);
        if (res.success) {
          this.users = res.usersWithRoles;
          console.log(this.users);
        } else {
          console.log('API returned status false or data not found.');
        }
      },
      (error: any) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  deleteUser(index: number): void {
    const userId = this.users[index].id;
    this.allUserService.deleteUser(userId).subscribe(
      (response: any) => {
        console.log('API response:', response);
        if (response) {
          if (response.success) {
            console.log('User deleted successfully');
            this.users.splice(index, 1);
          } else {
            console.log('Failed to delete user');
          }
        } else {
          console.log('Response is undefined or null');
        }
      },
      (error: any) => {
        console.log('Error occurred while deleting user:', error);
      }
    );
  }


  selectUser(user: any): void {
    this.selectedUser = { ...user }; 
    console.log(this.selectUser);
  }

  clearForm(): void {
    this.newUser = {};
  }
}





