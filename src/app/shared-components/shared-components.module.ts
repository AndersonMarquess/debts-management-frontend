import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';
import { NotFoundComponent } from './not-found/not-found.component';


@NgModule({
	declarations: [
		NotFoundComponent,
		MenuComponent,
		FooterComponent
	],
	imports: [
		CommonModule,
		MaterialModule,
		RouterModule
	],
	exports: [
		NotFoundComponent,
		MenuComponent,
		FooterComponent
	]
})
export class SharedComponentsModule { }