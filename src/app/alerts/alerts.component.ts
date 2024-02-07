import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrl: './alerts.component.css',
})
export class AlertsComponent {
  user: any;
  username: any;

  constructor(private router: Router) {}

  onAlert() {
    this.router.navigateByUrl('/nav/home');
  }

  ngOnInit() {
    if (localStorage.getItem('loginUser') == null) {
      this.router.navigateByUrl('/login');
    } else {
      this.user = localStorage.getItem('loginUser');
      this.user = JSON.parse(this.user);
      this.username = this.user.userName;
    }
  }
}
