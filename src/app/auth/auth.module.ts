import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { AuthService } from './auth.service';
import { CreateAccountComponent } from './create-account/create-account.component';
import { LoginComponent } from './login/login.component';

@NgModule({
	declarations: [
		CreateAccountComponent,
		LoginComponent
	],
	imports: [
		CommonModule,
		HttpClientModule,
		MaterialModule,
		ReactiveFormsModule
	],
	providers: [AuthService],
	exports: [
		CreateAccountComponent,
		LoginComponent
	]
})
export class AuthModule { }