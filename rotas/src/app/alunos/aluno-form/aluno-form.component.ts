import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlunosService } from '../alunos.service';

@Component({
  selector: 'app-aluno-form',
  templateUrl: './aluno-form.component.html',
  styleUrls: ['./aluno-form.component.css']
})
export class AlunoFormComponent implements OnInit {

  inscricao!: Subscription
  aluno: any = {}

  constructor(private activedRoute: ActivatedRoute, private alunoService: AlunosService) { }

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

}
