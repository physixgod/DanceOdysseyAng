import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { RoleService } from 'src/app/services/role-services.service';
import { Role } from 'src/app/models/Role';

@Component({
  selector: 'app-useredit',
  templateUrl: './useredit.component.html',
  styleUrls: ['./useredit.component.css']
})
export class UsereditComponent implements OnInit {
  username: string | null = null;
  lastName: string | null = null;
  email: string = "";
  confpassword: string | null = null;
  user: User = new User;
  roles: Role[] = [];

  constructor(private userService: UserService, private router: Router, private roleService: RoleService) { }

  ngOnInit(): void {
    // Retrieve username from session storage
    this.username = sessionStorage.getItem('userName');

    // Call method to fetch user details using username
    if (this.username) {
      this.userService.getUserByUsername(this.username).subscribe(
        (user) => {
          // Assign user details to display
          this.user = user;
          this.lastName = user.lastName;
          this.email = user.email;
          this.confpassword = user.password;
        },
        (error) => {
          console.error('Error fetching user details:', error);
          // Handle error, e.g., display error message or redirect to login page
        }
      );
    }
  }
  addUser(): void {
    this.user.email == this.email;
    console.log('User object:', this.user); // Log the user object before making the request
    this.userService.addNewUser(this.user).subscribe(
      (data) => {
        console.log('Response from server:', data); // Log the response from the server
        alert("User Added  :) !!");
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Error adding user:', error); // Log any errors that occur
        alert("Error occurred while adding user. Please try again later.");
      }
    );
  }}
