import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  user: any;
  // ct: any;

  constructor(private router: Router) {}

  // ngDoCheck() {
  //   this.ct = this.service.getcardlen();
  // }

  ngOnInit(): void {
    // localStorage.setItem(Constants.TOKEN, '');
    // localStorage.getItem(Constants.TOKEN);
    // console.log(this.service.uploadedData);

    if (localStorage.getItem('loginUser') == null) {
      this.router.navigateByUrl('');
    }
    // if (this.dbService.register(this.user) == null) {
    //   this.router.navigateByUrl('/login');
    // }
  }

  logout() {
    localStorage.removeItem('loginUser');
    this.router.navigateByUrl('');
  }
}
