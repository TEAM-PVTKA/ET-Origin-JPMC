import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CardsComponent } from './cards/cards.component';
import { UploaddataComponent } from './uploaddata/uploaddata.component';
import { OffersComponent } from './offers/offers.component';
import { LimitsComponent } from './limits/limits.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'nav',
    component: NavbarComponent,
    children: [
      { path: 'home', component: DashboardComponent },
      { path: 'cards', component: CardsComponent },
      { path: 'data', component: UploaddataComponent },
      { path: 'offers', component: OffersComponent },
      { path: 'limits', component: LimitsComponent },
      { path: 'expenses', component: ExpensesComponent },
      { path: 'contact', component: ContactComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
