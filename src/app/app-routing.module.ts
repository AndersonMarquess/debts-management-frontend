import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivePageGuard } from './auth/can-active-page.guard';
import { CreateAccountComponent } from './auth/create-account/create-account.component';
import { LoginComponent } from './auth/login/login.component';
import { DebtListComponent } from './debt/debt-list/debt-list.component';
import { NotFoundComponent } from './shared-components/not-found/not-found.component';
import { DebtAddComponent } from './debt/debt-add/debt-add.component';


const routes: Routes = [
	{ path: '', component: LoginComponent },
	{ path: 'create-account', component: CreateAccountComponent },
	{
		path: 'debts/all',
		component: DebtListComponent,
		canActivate: [CanActivePageGuard]
	},
	{
		path: 'debts/new',
		component: DebtAddComponent,
		canActivate: [CanActivePageGuard]
	},
	{ path: '**', component: NotFoundComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
