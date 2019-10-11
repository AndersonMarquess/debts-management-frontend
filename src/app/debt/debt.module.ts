import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { TokenSetterModule } from '../auth/token-setter.interceptor';
import { MaterialModule } from '../material/material.module';
import { DebtListComponent } from './debt-list/debt-list.component';
import { DebtService } from './debt.service';


@NgModule({
	declarations: [DebtListComponent],
	imports: [
		CommonModule,
		MaterialModule,
		TokenSetterModule
	],
	providers: [DebtService],
	exports: [DebtListComponent]
})
export class DebtModule { }