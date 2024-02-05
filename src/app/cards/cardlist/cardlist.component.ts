import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from '../../service/database.service';
import { CardDetails } from '../../service/data.module';

@Component({
  selector: 'app-cardlist',
  templateUrl: './cardlist.component.html',
  styleUrl: './cardlist.component.css',
})
export class CardlistComponent {
  cardsArray!: CardDetails[];

  cardNumber1!: number;
  cardNumber2!: number;
  cardNumber3!: number;
  cardExpiry!: string;
  cardHolder!: string;
  card!: CardDetails;
  constructor(private path: Router, private dbService: DatabaseService) {}
  ngOnInit() {
    const loggedInUser = localStorage.getItem('loginUser');
    if (loggedInUser) {
      this.dbService.getCardsForUser(loggedInUser).subscribe(
        (cards) => (this.cardsArray = cards),
        (error) => console.error('Error fetching cards:', error)
      );
    }
    // this.service.cardList$.subscribe((cards: CardDetails[]) => {
    //   if (cards.length) {
    //     this.cardsArray = this.service.cardList;
    //   }
    // });
  }

  onDelete(index: number) {
    this.cardsArray.splice(index, 1);
  }
}
