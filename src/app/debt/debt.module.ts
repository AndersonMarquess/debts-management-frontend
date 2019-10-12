import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TokenSetterModule } from '../auth/token-setter.interceptor';
import { MaterialModule } from '../material/material.module';
import { DebtAddComponent } from './debt-add/debt-add.component';
import { DebtListComponent } from './debt-list/debt-list.component';
import { DebtService } from './debt.service';
import { DeleteDebtOverviewDialog } from './dialog/delete/delete-debt-overview-dialog';
import { EditDebtOverviewDialog } from './dialog/edit/edit-debt-overview-dialog';


@NgModule({
	declarations: [
		DebtListComponent,
		DebtAddComponent,
		DeleteDebtOverviewDialog,
		EditDebtOverviewDialog
	],
	imports: [
		CommonModule,
		MaterialModule,
		TokenSetterModule,
		ReactiveFormsModule,
		FormsModule
	],
	providers: [DebtService],
	exports: [
		DebtListComponent,
		DebtAddComponent
	],
	// Component de dialogo
	entryComponents: [
		DeleteDebtOverviewDialog,
		EditDebtOverviewDialog
	]
})
export class DebtModule { }