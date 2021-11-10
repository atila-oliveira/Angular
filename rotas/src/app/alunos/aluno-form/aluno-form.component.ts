import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormCanDeactivate } from 'src/app/guards/form-candeactivate';
import { AlunosService } from '../alunos.service';

@Component({
  selector: 'app-aluno-form',
  templateUrl: './aluno-form.component.html',
  styleUrls: ['./aluno-form.component.css']
})
export class AlunoFormComponent implements OnInit, FormCanDeactivate {

  inscricao!: Subscription
  aluno: any = {}
  private formMudou: boolean = false

  constructor(private activedRoute: ActivatedRoute, private alunoService: AlunosService) { }
  
  podeDesativar() {
    return this.podeMudarRota()
  }

  ngOnInit(): void {
    this.inscricao = this.activedRoute.params.subscribe((params:any)=>{
      let id = params['id'];
      this.aluno = this.alunoService.getAluno(id)

      if(this.aluno === null){
        this.aluno = {}

      }
    })
  }

  ngOnDestroy() {
    this.inscricao.unsubscribe()
  }

  onInput(){
    this.formMudou = true;
    console.log('mudou')
  }

  podeMudarRota(){
    if(this.formMudou){
      confirm('Tem certeza que deseja sair dessa página?')
    }
    return true;
  }

}
