import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CardDetails } from '../cards/cards.model';

@Injectable({
  providedIn: 'root',
})
export class CarddetailsService {
  cardList: CardDetails[] = [];
  cardList$ = new Subject<CardDetails[]>();
  constructor() {}
}
