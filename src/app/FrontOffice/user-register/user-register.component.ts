import { Component } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { RoleService } from 'src/app/services/role-services.service';
import { Role } from 'src/app/models/Role';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent {
  
  captchaResolved: boolean = false;
  handleCaptchaResponse(response: string): void {
    // Handle the response from reCAPTCHA
    console.log('reCAPTCHA response:', response);
    this.captchaResolved = true;
    
  }

  user: User = {
    userID: 0,
    userName: '',
    lastName: '',
    email: '',
    password: '',
    confpassword: '',
    role: new Role,
  };

  passwordStrength: string = '';
  indicatorClass: string = '';
  isButtonDisabled: boolean = false;
  roles: Role[] = [];
  constructor(private userService: UserService, private router: Router, private roleService: RoleService) { }

  ngOnInit(): void {
    this.getAllRoles();


  }

  addUser() {
    if (!this.captchaResolved) {
      alert("Please complete the ReCaptcha before submitting the form.");
      return; 
    }
    
    if (this.user.password !== this.user.confpassword) {
      alert("Password and confirmation password do not match.");
      return;
      
    }


    this.passwordStrength = this.calculatePasswordStrength(this.user.password);
    this.setIndicatorClass(this.passwordStrength);

    if (this.passwordStrength === 'weak') {
      this.isButtonDisabled = true;
      return;
    }

    this.userService.addNewUser(this.user).subscribe(
      (data) => {
        alert("User Added  :) !!");
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error(error);
        alert("Error occurred while adding user. Please try again later.");
      }
    );
  }

  calculatePasswordStrength(password: string): string {
    if (password.length < 8) return 'weak';

    let hasLowercase = false;
    let hasUppercase = false;
    let hasDigit = false;
    let hasSpecialChar = false;

    for (let char of password) {
      if (/[a-z]/.test(char)) hasLowercase = true;
      else if (/[A-Z]/.test(char)) hasUppercase = true;
      else if (/\d/.test(char)) hasDigit = true;
      else if (/[^a-zA-Z0-9]/.test(char)) hasSpecialChar = true;
    }

    let strength = 0;
    if (hasLowercase) strength++;
    if (hasUppercase) strength++;
    if (hasDigit) strength++;
    if (hasSpecialChar) strength++;

    if (strength < 3) return 'weak';
    else if (strength < 4) return 'moderate';
    else return 'strong';
  }
  

  setIndicatorClass(strength: string): void {
    if (strength === 'weak') {
      this.indicatorClass = 'weak-password';
    } else if (strength === 'moderate') {
      this.indicatorClass = 'moderate-password';
    } else if (strength === 'strong') {
      this.indicatorClass = 'strong-password';
    }

  }

  checkPasswordStrength(): void {
    this.passwordStrength = this.calculatePasswordStrength(this.user.password);
    this.setIndicatorClass(this.passwordStrength);
  }
  calculateStrengthBarWidth(): string {
    if (this.passwordStrength === 'weak') {
      return '33%';
    } else if (this.passwordStrength === 'moderate') {
      return '66%';
    } else {
      return '100%';
    }
  }

  getAllRoles() {

    this.roleService.getAllRoles().subscribe((data: Role[]) => {
      console.log("Data from server", data);
      this.roles = data;
    });



  }
}
