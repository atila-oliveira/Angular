import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AlunosDeactivateGuard } from "../guards/alunos-deactivate.guard";
import { AuthGuard } from "../guards/auth.guard";
import { AlunoDetalheComponent } from "./aluno-detalhe/aluno-detalhe.component";
import { AlunoFormComponent } from "./aluno-form/aluno-form.component";
import { AlunosComponent } from "./alunos.component";
import { AlunoDetalheResolver } from "./guards/aluno-detalhe.resolver";

//colocar rotas hardcode antes das rotas dinâmicas para evitar colisões
const alunosRoutes: Routes = [
    {path: '', canActivate: [AuthGuard] ,component: AlunosComponent, children: [ //rotas filhas são uteis para exibir mais de um componente na mesma tela
        {path: 'novo', component: AlunoFormComponent, canActivate: [AuthGuard], canDeactivate: [AlunosDeactivateGuard]},
        {path: ':id', component: AlunoDetalheComponent, canActivate: [AuthGuard],
        resolve: { aluno: AlunoDetalheResolver}
        },
        {path: ':id/editar', component: AlunoFormComponent, canActivate: [AuthGuard], canDeactivate: [AlunosDeactivateGuard]}
    ]},
]

@NgModule({
    imports: [RouterModule.forChild(alunosRoutes)],
    exports: [RouterModule]

})
export class AlunosRoutingModule{}