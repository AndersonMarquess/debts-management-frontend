import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { DebtModule } from './debt/debt.module';
import { SharedComponentsModule } from './shared-components/shared-components.module';


@NgModule({
	declarations: [
		AppComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		AuthModule,
		SharedComponentsModule,
		DebtModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
