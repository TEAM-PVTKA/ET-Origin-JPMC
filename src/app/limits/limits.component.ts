import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-limits',
  templateUrl: './limits.component.html',
  styleUrl: './limits.component.css'
})
export class LimitsComponent {

  categOptions: string[] = [
    'Groceries',
    'Utilities',
    'Entertainment',
    'My Bills',
    'Transportation',
    'Shopping',
  ]; // Simulated card options
  selectedCategory: string = '';
  minimumLimit: number = 0;
  spendingLimits: any | number[] = [];
  categoryNames: string[] = [];
  totalValue: any | number = 0;
  maximumLimit: number = 20000;

  categories: { name: string; limit: number; totalValue: number }[] = [];

  mylimit: any | number;

  flag: boolean = false;

  constructor( private router: Router) {}

  ngOnInit() {
    if (localStorage.getItem('loginUser') == null) {
      this.router.navigateByUrl('/login');
    }
  }

  handleSetLimit() {
    if (this.selectedCategory.trim() === '') {
      this.flag = true;
      return;
    } else {
      const categoryIndex = this.categoryNames.indexOf(this.selectedCategory);

      if (categoryIndex === -1) {
        this.categoryNames.push(this.selectedCategory);
        this.spendingLimits.push(this.minimumLimit);
      }

      // this.limitser.limitsArray.push(this.categoryNames,this.spendingLimits)
      else {
        alert('Category already exists. Update the limit if needed.');
      }

      this.selectedCategory = '';
    }
  }

  handleInput(event: any) {
    const enteredValue = event.target.value;

    if (this.categOptions.includes(enteredValue)) {
      this.selectedCategory = enteredValue;
    } else {
      this.selectedCategory = '';
    }
  }
  handleReset() {
    this.minimumLimit = 0;
    this.selectedCategory = '';
    this.flag = false;
  }
  handleRemoveRow(index: number) {
    this.categoryNames.splice(index, 1);
    this.spendingLimits.splice(index, 1);
  }

}
