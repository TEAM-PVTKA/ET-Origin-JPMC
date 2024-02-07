import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from '../service/database.service';
import Swal from 'sweetalert2';

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

  togglePage(): void {
    const overlaySignIn = document.querySelector(
      '.overlay-signin'
    ) as HTMLElement;
    const overlaySignUp = document.querySelector(
      '.overlay-signup'
    ) as HTMLElement;
    const signUp = document.querySelector('.signup') as HTMLElement;
    const signIn = document.querySelector('.signin') as HTMLElement;

    overlaySignIn.classList.toggle('show');
    overlaySignUp.classList.toggle('hide');
    signUp.classList.toggle('show');
    signIn.classList.toggle('hide');
  }

  loginCheck() {
    if (this.uname == null && this.pwd == null) {
      Swal.fire({
        title: 'Login Failed',
        text: ' "Oops! It seems there was an issue with your login credentials." ',
        icon: 'error',
      });
    } else {
      this.dbService
        .login({ userName: this.uname, password: this.pwd })
        .subscribe(
          (result) => {
            // Handle successful login
            this.user = {
              userName: this.uname,
            };
            localStorage.setItem('loginUser', JSON.stringify(this.user));
            console.log(result);
            this.router.navigateByUrl('/nav/cards');
            //alert for login success
            Swal.fire({
              title: 'Login Successful',
              text: 'Welcome back! You have successfully logged in. Enjoy your experience!',
              icon: 'success',
            });
          },
          (error) => {
            // Handle login error
            console.error(error);
            // alert('Invalid username or Password');
            Swal.fire({
              title: 'Login',
              text: 'Invalid username or password. Please enter valid login credentials.',
              icon: 'warning',
            });
          }
        );
    }
  }

  registerNow() {
    if (
      this.signupPassword == null &&
      this.signupUsername == null &&
      this.signupEmail == null
    ) {
      Swal.fire({
        title: 'Sign Up Failed',
        icon: 'error',
        text: ' "Uh-oh! Enter your details & Proceed further"',
      });
      return;
    } else {
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
            this.user = {
              userName: this.uname,
            };
            localStorage.setItem('loginUser', JSON.stringify(this.user));
            Swal.fire({
              title: 'User registered successfully',
              icon: 'success',
              text: ' "Now login with your details!!"',
            });
            // alert('User registered successfully, Now please login');
            this.router.navigateByUrl('/login');
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
}
