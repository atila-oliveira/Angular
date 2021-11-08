import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AlunoDetalheComponent } from "./aluno-detalhe/aluno-detalhe.component";
import { AlunoFormComponent } from "./aluno-form/aluno-form.component";
import { AlunosComponent } from "./alunos.component";

//colocar rotas hardcode antes das rotas dinâmicas para evitar colisões
const alunosRoutes: Routes = [
    {path: 'alunos', component: AlunosComponent, children: [ //rotas filhas são uteis para exibir mais de um componente na mesma tela
        {path: 'novo', component: AlunoFormComponent},
        {path: ':id', component: AlunoDetalheComponent},
        {path: ':id/editar', component: AlunoFormComponent}
    ]},
]

@NgModule({
    imports: [RouterModule.forChild(alunosRoutes)],
    exports: [RouterModule]

})
export class AlunosRoutingModule{}