import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlunosGuard } from './guards/alunos.guard';
import { AuthGuard } from './guards/auth.guard';
import { CursosGuard } from './guards/cursos.guard';
//import { CursoDetalheComponent } from './cursos/curso-detalhe/curso-detalhe.component';
//import { CursoNaoEncontradoComponent } from './cursos/curso-nao-encontrado/curso-nao-encontrado.component';
//import { CursosComponent } from './cursos/cursos.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';

//define os endpoints das urls e o componente que será exibido no endpoint especificado
const routes: Routes = [
  {path: 'cursos', 
    canActivate: [AuthGuard], 
    loadChildren: () => import('./cursos/cursos.module').then(m => m.CursosModule),
    canActivateChild: [CursosGuard],
    canLoad: [AuthGuard]
  },
  {path: 'alunos', 
    canActivate: [AuthGuard],
    //lazyloading
    loadChildren: () => import('./alunos/alunos.module').then(a => a.AlunosModule),
    canActivateChild: [AlunosGuard],
    canLoad: [AuthGuard]
  },
  //{path:'curso/:id', component: CursoDetalheComponent },
  {path: 'login', component: LoginComponent},
  //{path: 'naoEncontrado', component: CursoNaoEncontradoComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  //uso de ** no path para qualquer rota digitada diferente das especificadas. Recomendado ficar por último no Array
  {path: '**', component: PaginaNaoEncontradaComponent}];

//const routing: ModuleWithProviders<any> = RouterModule.forRoot(routes);

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
