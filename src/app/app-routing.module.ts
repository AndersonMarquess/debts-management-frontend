import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivePageGuard } from './auth/can-active-page.guard';
import { CreateAccountComponent } from './auth/create-account/create-account.component';
import { LoginComponent } from './auth/login/login.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { NotAllowAccessAfterLoginGuard } from './auth/not-allow-access-after-login.guard';
import { DebtAddComponent } from './debt/debt-add/debt-add.component';
import { DebtListComponent } from './debt/debt-list/debt-list.component';
import { NotFoundComponent } from './shared-components/not-found/not-found.component';


const routes: Routes = [
	{
		path: '',
		component: LoginComponent,
		canActivate: [NotAllowAccessAfterLoginGuard]
	},
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
	{ path: 'logout', component: LogoutComponent },
	{ path: '**', component: NotFoundComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
