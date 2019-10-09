import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatGridListModule, MatIconModule, MatInputModule } from "@angular/material";
import { MatFormFieldModule } from '@angular/material/form-field';


const MaterialComponents = [
	MatButtonModule,
	MatFormFieldModule,
	MatIconModule,
	MatInputModule,
	MatGridListModule,
	FlexLayoutModule
];

@NgModule({
	imports: [
		MatButtonModule,
		MatFormFieldModule,
		MatIconModule,
		MatInputModule,
		MatGridListModule,
		FlexLayoutModule
	],
	exports: [MaterialComponents]
})
export class MaterialModule { }
