import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigateComponent } from './navigate/navigate.component';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [
    NavigateComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  exports:[NavigateComponent]
})
export class SharedModule { }
