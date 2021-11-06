import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ExemplosPipesComponent } from './exemplos-pipes/exemplos-pipes.component';
import { CamelCasePipe } from './camel-case.pipe';

@NgModule({
  declarations: [ //components, diretivas e pipes 
    AppComponent,
    ExemplosPipesComponent,
    CamelCasePipe,
  ],
  imports: [ //modulos
    BrowserModule
  ],
  providers: [
   /* {provide: LOCALE_ID,
    useValue: 'pt-BR'}*/
  ],
  bootstrap: [AppComponent]//servicos
})
export class AppModule { }
