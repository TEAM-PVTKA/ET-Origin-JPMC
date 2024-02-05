export interface UploadData {
  years: YearData[];
}

export interface YearData {
  year: number;
  months: MonthlyData[];
}

export interface MonthlyData {
  month: string;
  income: number;
  expenses: Expenses[];
  limits: Limits[];
}

export interface Expenses {
  category: string;
  amount: number;
}

export interface Limits {
  category: string;
  amount: number;
}

export interface CategoryList {
  groceries: string;
  utilities: string;
  entertainment: string;
  myBills: string;
  transportation: string;
  shopping: string;
}

export interface CardDetails {
  cardNumber1: number;
  cardNumber2: number;
  cardNumber3: number;
  cardExpiry: string;
  cardHolder: string;
  cardNumberId: string;
}
