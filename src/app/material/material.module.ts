import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatCardModule, MatDividerModule, MatGridListModule, MatIconModule, MatInputModule, MatProgressBarModule } from "@angular/material";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';



@NgModule({
	exports: [
		MatButtonModule,
		MatFormFieldModule,
		MatIconModule,
		MatInputModule,
		MatGridListModule,
		FlexLayoutModule,
		MatCardModule,
		MatDividerModule,
		MatProgressBarModule,
		MatPaginatorModule
	]
})
export class MaterialModule { }
