import { Component, OnInit } from '@angular/core';
import { LimitsService } from './service/limits.service';
import { UploadData } from './service/data.model';
import { Constants } from './service/constants';
import { Router } from '@angular/router';
import { DatabaseService } from './service/database.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Demo';
}
