import { Component } from '@angular/core';
import { CardDetailsService } from '../service/carddetails.service';
import { Router } from '@angular/router';
import { CardDetails } from './cards.model';
import { NgForm } from '@angular/forms';
import { DatabaseService } from '../service/database.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css',
})
export class CardsComponent {
  constructor(
    private service: CardDetailsService,
    private router: Router,
    private dbService: DatabaseService
  ) {}
  cardNumber1: number;
  cardNumber2: number;
  cardNumber3: number;
  cardNumber4: number;
  cardExpiry: string;
  cardHolder: string;

  card: CardDetails;

  ngOnInit() {
    if (localStorage.getItem('loginUser') == null) {
      this.router.navigateByUrl('/login');
    }
  }

  resetform(myForm: NgForm) {
    myForm.resetForm();
  }

  addCard() {
    // console.log(this.cardNumber1)
    if (
      this.cardNumber1?.toString().length !== 4 ||
      this.cardNumber2?.toString().length !== 4 ||
      this.cardNumber3?.toString().length !== 4 ||
      this.cardNumber4?.toString().length !== 4
    ) {
      alert('Card is Invalid');
      return;
    }

    const cardNumberId =
      this.cardNumber1.toString() +
      this.cardNumber2.toString() +
      this.cardNumber3.toString() +
      this.cardNumber4.toString();
    if (
      this.service.cardList.findIndex((e: CardDetails) => {
        return e.cardNumberId === cardNumberId;
      }) !== -1
    ) {
      alert('Duplicate Card');
      return;
    }

    this.dbService
      .cards({
        cardNumber1: this.cardNumber1,
        cardNumber2: this.cardNumber2,
        cardNumber3: this.cardNumber3,
        cardNumber4: this.cardNumber4,
        cardExpiry: this.cardExpiry,
        cardHolder: this.cardHolder,
        cardNumberId: cardNumberId,
      })
      .subscribe((result) => {
        console.log(result);
      });

    this.card = {
      cardNumber1: this.cardNumber1,
      cardNumber2: this.cardNumber2,
      cardNumber3: this.cardNumber3,
      cardNumber4: this.cardNumber4,
      cardExpiry: this.cardExpiry,
      cardHolder: this.cardHolder,
      cardNumberId: cardNumberId,
    };
    this.service.cardList.push(this.card);
    this.service.cardList$.next(this.service.cardList);

    // this.dbService
    //   .cards({
    //     cardNumber1: this.cardNumber1,
    //     cardNumber2: this.cardNumber2,
    //     cardNumber3: this.cardNumber3,
    //     cardExpiry: this.cardExpiry,
    //     cardHolder: this.cardHolder,
    //     cardNumberId: cardNumberId,
    //   })
    //   .subscribe((result) => {
    //     console.log(result);
    //   });

    alert('Card Added Successfully');
    // this.router.navigateByUrl('/nav/limits');
  }

  onValueChange(name: string, value: string) {
    // this[name]=value.replace(/[a-zA-Z]/g, '');
  }
}