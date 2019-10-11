import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { MaterialModule } from '../material/material.module';
import { DebtListComponent } from './debt-list/debt-list.component';
import { DebtService } from './debt.service';

@NgModule({
	declarations: [
		DebtListComponent
	],
	imports: [
		CommonModule,
		MaterialModule
	],
	providers: [
		DebtService
	],
	exports: [DebtListComponent]
})
export class DebtModule { }