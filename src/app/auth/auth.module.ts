import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { AuthService } from './auth.service';
import { LoginComponent } from './login/login.component';

@NgModule({
	declarations: [LoginComponent],
	imports: [
		CommonModule,
		HttpClientModule,
		MaterialModule,
		ReactiveFormsModule
	],
	providers: [AuthService],
	exports: [LoginComponent]
})
export class AuthModule { }