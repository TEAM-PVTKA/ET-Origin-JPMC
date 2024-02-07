import { Injectable } from '@angular/core';
import { Subject, of } from 'rxjs';
import { CardDetails } from '../cards/cards.model';

@Injectable({
  providedIn: 'root',
})
export class CardDetailsService {
  cardList: CardDetails[] = [];
  cardList$ = new Subject<CardDetails[]>()
  constructor() {}


  
 

}
