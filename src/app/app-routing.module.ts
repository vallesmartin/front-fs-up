import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './security/login.component';
import { LoginDataComponent } from './security/login-data/login-data.component';
import { User } from './security/app-user';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { OrderComponent } from './order/order.component';
import { MypeluchesComponent } from './mypeluches/mypeluches.component';
import { PelucheComponent } from './peluche/peluche.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'order', component: OrderComponent },
  { path: 'mypeluches', component: MypeluchesComponent },
  { path: 'peluche', component: PelucheComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'logindata', component: LoginDataComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), HttpClientModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
