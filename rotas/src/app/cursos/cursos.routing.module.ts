import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { CursoDetalheComponent } from './curso-detalhe/curso-detalhe.component';
import { CursoNaoEncontradoComponent } from './curso-nao-encontrado/curso-nao-encontrado.component';
import { CursosComponent } from './cursos.component';

//define os endpoints das urls e o componente que será exibido no endpoint especificado
const cursosRoutes: Routes = [
  {path: 'cursos', component: CursosComponent, canActivate: [AuthGuard]},//AuthGuard aplicado em cada rota que o usuário não pode acessar sem estar logado
  {path:'curso/:id', component: CursoDetalheComponent, canActivate: [AuthGuard] },
  {path: 'naoEncontrado', component: CursoNaoEncontradoComponent, canActivate: [AuthGuard]}];

//const routing: ModuleWithProviders<any> = RouterModule.forRoot(routes);

@NgModule({
  imports: [RouterModule.forChild(cursosRoutes)],
  exports: [RouterModule]
})
export class CursosRoutingModule { }
