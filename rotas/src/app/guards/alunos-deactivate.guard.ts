import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { AlunoFormComponent } from "../alunos/aluno-form/aluno-form.component";
import { FormCanDeactivate } from "./form-candeactivate";

@Injectable()
export class AlunosDeactivateGuard implements CanDeactivate<FormCanDeactivate> {
       
        canDeactivate(
            component: FormCanDeactivate,
            route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot
        ): Observable<boolean>|Promise<boolean>|boolean {
            console.log('guarda de desativação')
            //return component.podeMudarRota()
            return component.podeDesativar()
    }
}
