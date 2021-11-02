import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CursosModule } from './cursos/cursos.module';
import { DataBindingComponent } from './data-binding/data-binding.component';
import { ClassStyleBindingComponent } from './class-style-binding/class-style-binding.component';
import { FormsModule } from '@angular/forms';
import { MeuFormModule } from './meu-form/meu-form.module';
import { InputPropertyComponent } from './input-property/input-property.component';
import { OutputPropertyComponent } from './output-property/output-property.component';
import { CicloComponent } from './ciclo/ciclo.component';

@NgModule({
  declarations: [
    AppComponent,
    DataBindingComponent,
    ClassStyleBindingComponent,
    InputPropertyComponent,
    OutputPropertyComponent,
    CicloComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CursosModule,
    FormsModule,
    MeuFormModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
