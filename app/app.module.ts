import {
  NgModule
} from '@angular/core';
import {
  BrowserModule
} from '@angular/platform-browser';
import {
  FormsModule
} from '@angular/forms';
import {
  CommonModule
} from '@angular/common';
import {
  ColorPickerModule
} from 'angular2-color-picker';
import {
  MaterialModule
} from '@angular/material';

import {
  AppComponent
} from './app.component';


@NgModule({
  imports: [BrowserModule, FormsModule, CommonModule, ColorPickerModule, MaterialModule.forRoot()],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}