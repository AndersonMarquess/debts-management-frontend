import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { AuthService } from './auth.service';
import { CreateAccountComponent } from './create-account/create-account.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
	declarations: [
		CreateAccountComponent,
		LoginComponent,
		LogoutComponent
	],
	imports: [
		CommonModule,
		HttpClientModule,
		MaterialModule,
		ReactiveFormsModule,
		RouterModule
	],
	providers: [AuthService],
	exports: [
		CreateAccountComponent,
		LoginComponent,
		LogoutComponent
	]
})
export class AuthModule { }