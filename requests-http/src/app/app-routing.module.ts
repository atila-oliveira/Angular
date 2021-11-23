import { NgModule } from '@angular/core';
import { RouterModule, Routes, UrlSerializer } from '@angular/router';


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'busca-reativa'},
  {path: 'cursos', loadChildren: () => import('./cursos/cursos.module').then(m => m.CursosModule)},
  {path: 'upload', loadChildren: () => import('./upload-file/upload-file.module').then(m => m.UploadFileModule)},
  {path: 'rxjs-poc', loadChildren: () => import('./unsubscribe-rxjs/unsubscribe-rxjs.module').then(m => m.UnsubscribeRxjsModule)},
  {path: 'busca-reativa', loadChildren: () => import('./reactive-search/reactive-search.module').then(m => m.ReactiveSearchModule)}
  //{path: 'url-invalida'}
];

@NgModule({
  //scroollPositionResttoration: ao voltar à página anterior, irá voltar na área de onde o usuário parou para ir à próxima página
  //malformedUriErrorHandler: caso a url passada tenha erro, volta pra tela 
  //urlUpdateStrategy: eager (default) verifica as rotas configuradas antes de redirecionar. 'deferred' redireciona primeiro e depois verifica
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled',
            /*malformedUriErrorHandler: (error:URIError, urlSerializer: UrlSerializer, url:string) =>{
            console.log(url)
            return urlSerializer.parse('/url-invalida');
          },*/
        urlUpdateStrategy: 'eager' //'deferred'
      })
      ],
  exports: [RouterModule]
})
export class AppRoutingModule { }