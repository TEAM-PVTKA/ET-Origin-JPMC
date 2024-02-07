import { Component } from '@angular/core';
import { CardDetailsService } from '../../service/carddetails.service';
import { Router } from '@angular/router';
import { CardDetails } from '../cards.model';
import { DatabaseService } from '../../service/database.service';

@Component({
  selector: 'app-cardlist',
  templateUrl: './cardlist.component.html',
  styleUrl: './cardlist.component.css',
})
export class CardListComponent {
  cardsArray: CardDetails[] = [];

  cardNumber1: number;
  cardNumber2: number;
  cardNumber3: number;
  cardExpiry: string;
  cardHolder: string;
  card: CardDetails;

  flag: boolean = true;

  constructor(
    private service: CardDetailsService,
    private router: Router,
    private dbService: DatabaseService
  ) {}

  onLimit(){
    this.router.navigateByUrl('/nav/limits')
  }

  ngOnInit() {
    const loggedInUser = localStorage.getItem('loginUser');

    console.log(loggedInUser);
    this.service.cardList$.subscribe((cards: CardDetails[]) => {
      if (cards.length) {
        this.cardsArray = this.service.cardList;
      }

      if (this.cardsArray.length > 0) {
        this.flag = false;
      }
    });

    if (loggedInUser) {
      this.dbService.getCardsForUser(loggedInUser).subscribe(
        (cards) => (this.cardsArray = cards),
        (err) => console.log(err)
      );
    }
  }

  onDelete(index: number) {
    this.cardsArray.splice(index, 1);
  }
}
