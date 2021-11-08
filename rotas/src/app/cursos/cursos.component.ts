import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CursosService } from './cursos.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {

  pagina!: number;
  inscricao!: Subscription;
  cursos: any[] = [];

  constructor(private cursoService:CursosService, private activatedRoute: ActivatedRoute, private router: Router) { }

  proximaPagina(){
    //this.pagina++;
    this.router.navigate(['/cursos'], {queryParams: {'pagina': ++this.pagina}})
  }

  ngOnInit(): void {
    this.cursos = this.cursoService.getCursos();
    this.inscricao = this.activatedRoute.queryParams.subscribe((queryParams: any) =>{
      this.pagina = queryParams['pagina']
    })
  }

  ngOnDestroy() {
    this.inscricao.unsubscribe() 
  }

}
