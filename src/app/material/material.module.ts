import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
	MatButtonModule,
	MatCardModule,
	MatDividerModule,
	MatGridListModule,
	MatIconModule,
	MatInputModule,
	MatOptionModule,
	MatProgressBarModule,
	MatSelectModule,
	MatDialogModule
} from "@angular/material";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar'; 
import { MatMenuModule } from '@angular/material/menu';


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
		MatPaginatorModule,
		MatSelectModule,
		MatOptionModule,
		MatDialogModule,
		MatSnackBarModule,
		MatMenuModule
	]
})
export class MaterialModule { }
