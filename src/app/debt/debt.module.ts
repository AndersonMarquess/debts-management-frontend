import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TokenSetterModule } from '../auth/token-setter.interceptor';
import { MaterialModule } from '../material/material.module';
import { DebtAddComponent } from './debt-add/debt-add.component';
import { DebtListComponent } from './debt-list/debt-list.component';
import { DebtRoutingModule } from './debt-routing.module';
import { DebtService } from './debt.service';
import { DeleteDebtOverviewDialog } from './dialog/delete/delete-debt-overview-dialog';
import { EditDebtOverviewDialog } from './dialog/edit/edit-debt-overview-dialog';
import { PayDebtOverviewDialog } from './dialog/pay/pay-debt-overview-dialog';


@NgModule({
	declarations: [
		DebtListComponent,
		DebtAddComponent,
		DeleteDebtOverviewDialog,
		EditDebtOverviewDialog,
		PayDebtOverviewDialog
	],
	imports: [
		CommonModule,
		MaterialModule,
		ReactiveFormsModule,
		FormsModule,
		TokenSetterModule,
		DebtRoutingModule,
		HttpClientModule
	],
	providers: [DebtService],
	// Componentes do dialog
	entryComponents: [
		DeleteDebtOverviewDialog,
		EditDebtOverviewDialog,
		PayDebtOverviewDialog
	]
})
export class DebtModule { }