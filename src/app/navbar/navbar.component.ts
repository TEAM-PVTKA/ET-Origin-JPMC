import { Component } from '@angular/core';
import { Router } from '@angular/router';

declare var bootstrap: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  title = 'Demo';
  user: any;
  // ct: any;

  constructor(private router: Router) {}

  ngAfterViewInit() {
    // Manually initialize the offcanvas
    const offcanvasElement = document.getElementById(
      'offcanvasWithBothOptions'
    );
    const offcanvas = new bootstrap.Offcanvas(offcanvasElement);
  }

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
