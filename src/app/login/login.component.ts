import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from '../service/database.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  signupUsername: any;
  signupPassword: any;
  signupEmail: any;

  constructor(private router: Router, private dbService: DatabaseService) {}

  uname: any;
  pwd: any;
  email: any;
  user: any;

  loginCheck() {
    this.dbService
      .login({ userName: this.uname, password: this.pwd })
      .subscribe(
        (result) => {
          // Handle successful login
          localStorage.setItem('loginUser', JSON.stringify(this.uname));
          console.log(result);
          this.router.navigateByUrl('/nav/cards');

          // if (result.role === 'admin') {
          //   // Redirect to admin dashboard
          //   this.router.navigateByUrl('/admin-nav/admin-dashboard');
          // } else {
          //   // Redirect to user dashboard
          //   this.router.navigateByUrl('/usernav/user-dashboard');
          // }
        },
        (error) => {
          // Handle login error
          console.error(error);
          alert('Invalid username or Password');
          // Swal.fire({
          //   title: 'Invalid username or password. Please enter valid login credentials.',
          //   icon: 'warning'
          // });
        }
      );
  }

  registerNow() {
    // if (this.signupPassword !== this.confirmPassword) {
    //   Swal.fire({
    //     title: 'Password and Confirm Password do not match.',
    //     icon: 'error'
    //   });
    //   return;
    // }

    this.dbService
      .register({
        userName: this.signupUsername,
        password: this.signupPassword,
        email: this.signupEmail,
      })
      .subscribe(
        (result) => {
          // Handle successful registration
          console.log(result);
          // Swal.fire({
          //   title: 'User registered successfully',
          //   icon: 'success'
          // });
          localStorage.setItem(
            'loginUser',
            JSON.stringify(this.signupUsername)
          );
          alert('User registered successfully');
          this.router.navigateByUrl('/nav/cards');
        },
        (error) => {
          // Handle registration error
          console.error(error);
          // Swal.fire({
          //   title: 'Error during registration. Please try again.',
          //   icon: 'error'
          // });
          alert('Error during registration');
        }
      );
  }
}
