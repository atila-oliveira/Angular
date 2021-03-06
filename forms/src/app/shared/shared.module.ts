import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormDebugComponent } from './form-debug/form-debug.component';



@NgModule({
  declarations: [FormDebugComponent],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [FormDebugComponent],
  providers: []
})
export class SharedModule { }
