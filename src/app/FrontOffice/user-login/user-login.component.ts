import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {
  email: string = ''; // Add email property
  password: string = ''; // Add password property

  constructor(private userService: UserService, private router: Router) {} 

  ngOnInit(): void {}

  login(): void {
    this.userService.loginUser(this.email, this.password).subscribe(
      (response) => {
        alert('Login successful.');
        sessionStorage.setItem("loggedIn", "true");
        sessionStorage.setItem("userName",response.userName);
        sessionStorage.setItem("email",response.email);
        sessionStorage.setItem("lastName",response.lastName);
        sessionStorage.setItem("token",response.token);
        sessionStorage.setItem("role",JSON.stringify(response.role));
        if(response.role.id==1){
          this.router.navigate(['/admin']);
        }
        else if(response.role.id ==2){
          this.router.navigate(['/homepage']);

        }
        else {
          this.router.navigate(['/homepage']);

        }
      },
      (error) => {
        // Handle login error
        console.error('Login error:', error);
        alert('Invalid email or password. Please try again.');
      }
    );
  }
  navigateToSignUp() {
    this.router.navigate(['/register']); 
  }
}
