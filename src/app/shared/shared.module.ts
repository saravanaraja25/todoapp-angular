import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextInputComponent } from './text-input/text-input.component';
import { MaterialModule } from 'src/material.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

const components = [
  TextInputComponent
];

const modules = [
  CommonModule,
  MaterialModule,
  FormsModule,
  HttpClientModule
];

@NgModule({
  declarations: [...components],
  imports: [...modules],
  exports: [...components, ...modules]
})
export class SharedModule { }