import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from '@angular/forms';
import { TokenSetterModule } from '../auth/token-setter.interceptor';
import { MaterialModule } from '../material/material.module';
import { DebtAddComponent } from './debt-add/debt-add.component';
import { DebtListComponent } from './debt-list/debt-list.component';
import { DebtService } from './debt.service';


@NgModule({
	declarations: [
		DebtListComponent,
		DebtAddComponent
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
	]
})
export class DebtModule { }