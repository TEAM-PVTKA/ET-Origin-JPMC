import { Component } from '@angular/core';
import { Constants } from './service/constants';
import { LimitsService } from './service/limits.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Hackathon';

  constructor(private service: LimitsService) {}

  ngOnInit(): void {
    localStorage.setItem(Constants.TOKEN, '');
    localStorage.getItem(Constants.TOKEN);
    console.log(this.service.uploadedData);
  }
}
