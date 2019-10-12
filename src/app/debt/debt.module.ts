import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from '@angular/forms';
import { TokenSetterModule } from '../auth/token-setter.interceptor';
import { MaterialModule } from '../material/material.module';
import { DebtAddComponent } from './debt-add/debt-add.component';
import { DebtListComponent } from './debt-list/debt-list.component';
import { DebtService } from './debt.service';
import { DeleteDebtOverviewDialog } from './dialog/delete/delete-debt-overview-dialog';


@NgModule({
	declarations: [
		DebtListComponent,
		DebtAddComponent,
		DeleteDebtOverviewDialog
	],
	imports: [
		CommonModule,
		MaterialModule,
		TokenSetterModule,
		ReactiveFormsModule
	],
	providers: [DebtService],
	exports: [
		DebtListComponent,
		DebtAddComponent
	],
	// Component de dialogo
	entryComponents: [DeleteDebtOverviewDialog]
})
export class DebtModule { }