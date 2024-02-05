import accessibilityModule from 'highcharts/modules/accessibility';

accessibilityModule(Highcharts);

import { Component } from '@angular/core';
import { LimitsService } from '../service/limits.service';
import { Router } from '@angular/router';
import * as Highcharts from 'highcharts';
import { homePieChart, barCharts } from '../charts';
import { Expenses, Limits, MonthlyData } from '../service/data.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  constructor(private service: LimitsService, private router: Router) {}
  highcharts = Highcharts;
  homePieChart = null;

  barCharts = null;

  ngOnInit(): void {
    Highcharts.setOptions({
      accessibility: {
        enabled: true, // Set to true to enable accessibility features
      },
    });

    this.getMonthlySummary();
    this.getMonthlyLimitstsVsExp();
    this.getHalfYearlySummary();
    this.getMonthlyLimits();

    if (localStorage.getItem('loginUser') == null) {
      this.router.navigateByUrl('/login');
    }
  }

  getMonthlyLimits() {
    const date = new Date();
    const monthNumber: MonthlyData = this.service.getMonthlyData(
      date.getMonth() + 1,
      date.getFullYear()
    );

    let monthlyLimits = monthNumber.limits;
    console.log(monthlyLimits);
  }

  getMonthlyIncome() {
    const date = new Date();
    const monthNumber: MonthlyData = this.service.getMonthlyData(
      date.getMonth() + 1,
      date.getFullYear()
    );

    return monthNumber?.income ?? 0;
  }

  getMonthlyExpenditure() {
    let expensesPerMonth = 0;
    const date = new Date();
    const monthNumber: MonthlyData = this.service.getMonthlyData(
      date.getMonth() + 1,
      date.getFullYear()
    );

    // Check if monthNumber or monthNumber.expenses is undefined
    if (monthNumber?.expenses) {
      monthNumber.expenses.forEach((f: Expenses) => {
        expensesPerMonth = expensesPerMonth + f.amount;
      });
    }

    return expensesPerMonth;
  }

  getSavings() {
    let expensesPerMonth = 0;
    const date = new Date();
    const monthNumber: MonthlyData = this.service.getMonthlyData(
      date.getMonth() + 1,
      date.getFullYear()
    );

    // Check if monthNumber or monthNumber.income or monthNumber.expenses is undefined
    if (monthNumber?.income && monthNumber?.expenses) {
      const monthlyInc = monthNumber.income;

      monthNumber.expenses.forEach((f: Expenses) => {
        expensesPerMonth = expensesPerMonth + f.amount;
      });

      const savingsPerMonth = monthlyInc - expensesPerMonth;
      return savingsPerMonth;
    }

    return 0; // Return a default value when unable to calculate savings
  }

  getHalfYearlySummary() {
    const incomeArray: number[] = [];
    const expensesArray: number[] = [];
    const monthsArray: string[] = [];

    const data: MonthlyData[] = this.service.getOldMonthlyData(6);
    data.forEach((e: MonthlyData) => {
      let expensesPerMonth = 0;
      incomeArray.unshift(e.income);
      monthsArray.unshift(e.month);
      e.expenses.forEach((f: Expenses) => {
        expensesPerMonth = expensesPerMonth + f.amount;
      });
      expensesArray.unshift(expensesPerMonth);
    });
  }

  getMonthlySummary() {
    const date = new Date();
    const monthyData: MonthlyData = this.service.getMonthlyData(
      date.getMonth() + 1,
      date.getFullYear()
    );

    const data = monthyData?.expenses?.map((e: Expenses) => {
      return { name: e.category, y: +e.amount };
    });

    this.homePieChart = {
      ...homePieChart,
      series: [
        {
          name: 'number',
          colorByPoint: true,
          data: data,
        },
      ],
    };
  }

  getMonthlyLimitstsVsExp() {
    const limitsArray: number[] = [];
    const expensesArray: number[] = [];
    const monthsArray: string[] = [];
    const categoryArray: string[] = [];

    const data: MonthlyData[] = this.service.getOldMonthlyData(1);
    data.forEach((e: MonthlyData) => {
      e.expenses.forEach((f: Expenses) => {
        expensesArray.push(f.amount);
        categoryArray.push(f.category);
        // console.log(categoryNames);
      });

      e.limits.forEach((g: Limits) => {
        limitsArray.push(g.amount);
      });

      // expensesArray.unshift(expensesPerMonth);
      // limitsArray.unshift(limitsPerMonth);
    });

    this.barCharts = {
      ...barCharts,
      xAxis: {
        categories: categoryArray,
        crosshair: true,
        accessibility: {
          description: 'Months',
        },
      },
      series: [
        {
          name: 'Limits',
          color: 'green',
          data: limitsArray,
        },
        {
          name: 'Expenses',
          color: 'red',
          data: expensesArray,
        },
      ],
    };
  }
}
