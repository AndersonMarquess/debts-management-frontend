import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DebtListComponent } from './debt-list/debt-list.component';
import { DebtAddComponent } from './debt-add/debt-add.component';

const routes = [
	{ path: 'all', component: DebtListComponent },
	{ path: 'new', component: DebtAddComponent }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class DebtRoutingModule { }