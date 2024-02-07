import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
import { LimitsService } from '../service/limits.service';
import { splineCharts } from '../chartoptions';
import { Expenses, MonthlyData } from '../service/data.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.css',
})
export class ExpensesComponent {
  constructor(private service: LimitsService, private router: Router) {}

  highcharts = Highcharts;
  splineCharts = null;
  splineCharts1 = null;
  splineCharts2 = null;
  splineCharts3 = null;
  currentChart: string = 'threeMonths'; // Default to 'threeMonths'

  ngOnInit(): void {
    this.getThreeMonthSummary();

    if (localStorage.getItem('loginUser') == null) {
      this.router.navigateByUrl('/login');
    }
    // this.getHalfYearlySummary();
    // this.getYearlySummary();
  }

  showChart(chartType: string): void {
    // Handle override logic here
    this.currentChart = chartType;

    // Update the displayed chart based on the selected button
    if (chartType === 'threeMonths') {
      this.getThreeMonthSummary();
    } else if (chartType === 'fourMonths') {
      this.getFourMonthSummary();
    } else if (chartType === 'sixMonths') {
      this.getHalfYearlySummary();
    } else if (chartType === 'yearly') {
      this.getYearlySummary();
    }
  }

  getThreeMonthSummary() {
    const incomeArray: number[] = [];
    const expensesArray: number[] = [];
    const monthsArray: string[] = [];
    const savingsArray: number[] = [];

    const data: MonthlyData[] = this.service.getOldMonthlyData(4);
    data.forEach((e: MonthlyData) => {
      let expensesPerMonth = 0;
      let savingsPerMonth = 0;
      incomeArray.unshift(e.income);
      monthsArray.unshift(e.month);
      e.expenses.forEach((f: Expenses) => {
        expensesPerMonth = expensesPerMonth + f.amount;
        savingsPerMonth = e.income - expensesPerMonth;
      });
      expensesArray.unshift(expensesPerMonth);
      savingsArray.unshift(savingsPerMonth);
      console.log(monthsArray);
    });

    this.splineCharts = {
      ...splineCharts,
      xAxis: {
        categories: monthsArray,
        crosshair: true,
        accessibility: {
          description: 'Months',
        },
      },
      series: [
        {
          name: 'Income',
          marker: {
            symbol: 'square',
          },
          data: incomeArray,
          color: 'Blue',
        },
        {
          name: 'Expenses',
          marker: {
            symbol: 'diamond',
          },
          data: expensesArray,
          color: 'Red',
        },
        {
          name: 'Savings',
          marker: {
            symbol: 'square',
          },
          data: savingsArray,
          color: 'Green',
        },
      ],
    };
  }

  getFourMonthSummary() {
    const incomeArray: number[] = [];
    const expensesArray: number[] = [];
    const monthsArray: string[] = [];
    const savingsArray: number[] = [];

    const data: MonthlyData[] = this.service.getOldMonthlyData(4);
    data.forEach((e: MonthlyData) => {
      let expensesPerMonth = 0;
      let savingsPerMonth = 0;
      incomeArray.unshift(e.income);
      monthsArray.unshift(e.month);
      e.expenses.forEach((f: Expenses) => {
        expensesPerMonth = expensesPerMonth + f.amount;
        savingsPerMonth = e.income - expensesPerMonth;
      });
      expensesArray.unshift(expensesPerMonth);
      savingsArray.unshift(savingsPerMonth);
      console.log(monthsArray);
    });

    this.splineCharts1 = {
      ...splineCharts,
      xAxis: {
        categories: monthsArray,
        crosshair: true,
        accessibility: {
          description: 'Months',
        },
      },
      series: [
        {
          name: 'Income',
          marker: {
            symbol: 'square',
          },
          data: incomeArray,
          color: 'Blue',
        },
        {
          name: 'Expenses',
          marker: {
            symbol: 'diamond',
          },
          data: expensesArray,
          color: 'Red',
        },
        {
          name: 'Savings',
          marker: {
            symbol: 'square',
          },
          data: savingsArray,
          color: 'Green',
        },
      ],
    };
  }

  getHalfYearlySummary() {
    const incomeArray: number[] = [];
    const expensesArray: number[] = [];
    const monthsArray: string[] = [];
    const savingsArray: number[] = [];

    const data: MonthlyData[] = this.service.getOldMonthlyData(6);
    data.forEach((e: MonthlyData) => {
      let expensesPerMonth = 0;
      let savingsPerMonth = 0;
      incomeArray.unshift(e.income);
      monthsArray.unshift(e.month);
      e.expenses.forEach((f: Expenses) => {
        expensesPerMonth = expensesPerMonth + f.amount;
        savingsPerMonth = e.income - expensesPerMonth;
      });
      expensesArray.unshift(expensesPerMonth);
      savingsArray.unshift(savingsPerMonth);
    });

    this.splineCharts2 = {
      ...splineCharts,
      xAxis: {
        categories: monthsArray,
        crosshair: true,
        accessibility: {
          description: 'Months',
        },
      },
      series: [
        {
          name: 'Income',
          marker: {
            symbol: 'square',
          },
          data: incomeArray,
          color: 'blue',
        },
        {
          name: 'Expenses',
          marker: {
            symbol: 'diamond',
          },
          data: expensesArray,
          color: 'red',
        },
        {
          name: 'Savings',
          marker: {
            symbol: 'square',
          },
          data: savingsArray,
          color: 'green',
        },
      ],
    };
  }

  getYearlySummary() {
    const incomeArray: number[] = [];
    const expensesArray: number[] = [];
    const monthsArray: string[] = [];
    const savingsArray: number[] = [];

    const data: MonthlyData[] = this.service.getOldMonthlyData(12);
    data.forEach((e: MonthlyData) => {
      let expensesPerMonth = 0;
      let savingsPerMonth = 0;
      incomeArray.unshift(e.income);
      monthsArray.unshift(e.month);
      e.expenses.forEach((f: Expenses) => {
        expensesPerMonth = expensesPerMonth + f.amount;
        savingsPerMonth = e.income - expensesPerMonth;
      });
      expensesArray.unshift(expensesPerMonth);
      savingsArray.unshift(savingsPerMonth);
    });

    this.splineCharts3 = {
      ...splineCharts,
      xAxis: {
        categories: monthsArray,
        accessibility: {
          description: 'Months of the year',
        },
      },
      series: [
        {
          name: 'Income',
          marker: {
            symbol: 'square',
          },
          data: incomeArray,
          color: 'blue',
        },
        {
          name: 'Expenses',
          marker: {
            symbol: 'diamond',
          },
          data: expensesArray,
          color: 'red',
        },
        {
          name: 'Savings',
          marker: {
            symbol: 'square',
          },
          data: savingsArray,
          color: 'green',
        },
      ],
    };
  }
}
