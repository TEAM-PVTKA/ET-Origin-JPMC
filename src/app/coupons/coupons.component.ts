import { Component } from '@angular/core';
import { LimitsService } from '../service/limits.service';
import { Expenses, MonthlyData } from '../service/data.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrl: './coupons.component.css',
})
export class CouponsComponent {
  currentAmount: number = 0;
  targetAmount: number = 1000;
  isEligibleForReward: boolean = false;
  isEligibleForReward1: boolean = false;
  isEligibleForReward2: boolean = false;
  isEligibleForReward3: boolean = false;
  isEligibleForReward4: boolean = false;

  constructor(private service: LimitsService, private router: Router) {}

  ngOnInit(): void {
    this.loadCurrentAmount();
    // this.checkEligibilityForReward();

    if (localStorage.getItem('loginUser') == null) {
      this.router.navigateByUrl('/login');
    }
  }

  loadCurrentAmount() {
    let expensesPerMonth = 0;
    const date = new Date();
    const monthNumber: MonthlyData = this.service.getMonthlyData(
      date.getMonth() + 1,
      date.getFullYear()
    );

    const monthlyInc = monthNumber.income;

    monthNumber.expenses.forEach((f: Expenses) => {
      expensesPerMonth = expensesPerMonth + f.amount;
    });

    const savingsPerMonth = monthlyInc - expensesPerMonth;
    console.log(savingsPerMonth);
    console.log(expensesPerMonth);
    console.log(monthlyInc);
    if (savingsPerMonth > 60000) {
      this.isEligibleForReward = !this.isEligibleForReward;
    } else if (savingsPerMonth > 70000) {
      this.isEligibleForReward1 = !this.isEligibleForReward1;
    } else if (savingsPerMonth > 80000) {
      this.isEligibleForReward2 = !this.isEligibleForReward2;
    } else if (savingsPerMonth > 90000) {
      this.isEligibleForReward3 = !this.isEligibleForReward3;
    } else if (savingsPerMonth > 100000) {
      this.isEligibleForReward4 = !this.isEligibleForReward4;
    }
  }

  enableReward() {
    // this.isEligibleForReward = !this.isEligibleForReward;
  }
}

// checkEligibilityForReward() {
//   this.transactionService.checkEligibilityForReward(this.userId).subscribe(eligible => {
//     this.isEligibleForReward = eligible;
//   });
// }

// setTarget() {
//   this.transactionService.setTargetAmount(this.userId, this.targetAmount).subscribe(() => {
//     this.loadCurrentAmount();
//     this.checkEligibilityForReward();
//   });
// }

// enableReward() {
//   this.transactionService.enableReward(this.userId).subscribe(() => {
//     // Optionally, you can handle success actions like showing a success message.
//     this.checkEligibilityForReward();
//   });
// }
