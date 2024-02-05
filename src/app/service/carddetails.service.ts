import { Injectable } from '@angular/core';
import { CardDetails } from './data.module';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarddetailsService {

  cardList: CardDetails[] = [];
  cardList$ = new Subject<CardDetails[]>()
  constructor() {}

}
