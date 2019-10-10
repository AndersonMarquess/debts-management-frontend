import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
	declarations: [NotFoundComponent],
	imports: [
		CommonModule,
		MaterialModule,
		RouterModule
	],
	exports: [NotFoundComponent]
})
export class SharedComponentsModule { }