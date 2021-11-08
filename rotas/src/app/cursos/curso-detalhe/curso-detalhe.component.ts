import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CursosService } from '../cursos.service';

@Component({
  selector: 'app-curso-detalhe',
  templateUrl: './curso-detalhe.component.html',
  styleUrls: ['./curso-detalhe.component.css']
})
export class CursoDetalheComponent implements OnInit {

  id!: number;
  inscricao: Subscription = new Subscription;
  curso: any;
//ActivatedRoute pega detalhes da rota como o parâmetro
  constructor(private activatedRoute: ActivatedRoute, private cursoService: CursosService, private router: Router) { 
    //this.id = this.activatedRoute.snapshot.params['id'];
    //console.log(this.activatedRoute)
  }

  ngOnInit(): void {
    this.inscricao = this.activatedRoute.params.subscribe((params:any) =>{
      this.id = params['id']

      this.curso = this.cursoService.getCurso(this.id)

      if(this.curso == null){
        this.router.navigate(['/naoEncontrado'])
      }

    } )
  }

  ngOnDestroy() {
    this.inscricao.unsubscribe()
  }

}
