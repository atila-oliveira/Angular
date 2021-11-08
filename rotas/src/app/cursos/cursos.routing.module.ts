import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CursoDetalheComponent } from './curso-detalhe/curso-detalhe.component';
import { CursoNaoEncontradoComponent } from './curso-nao-encontrado/curso-nao-encontrado.component';
import { CursosComponent } from './cursos.component';

//define os endpoints das urls e o componente que será exibido no endpoint especificado
const cursosRoutes: Routes = [
  {path: 'cursos', component: CursosComponent},
  {path:'curso/:id', component: CursoDetalheComponent },
  {path: 'naoEncontrado', component: CursoNaoEncontradoComponent}];

//const routing: ModuleWithProviders<any> = RouterModule.forRoot(routes);

@NgModule({
  imports: [RouterModule.forChild(cursosRoutes)],
  exports: [RouterModule]
})
export class CursosRoutingModule { }
