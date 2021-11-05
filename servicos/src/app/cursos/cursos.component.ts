import { Component, OnInit } from '@angular/core';
import { CursosService } from './cursos.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {

  cursos: string[] = []

  constructor(private _cursosService: CursosService) {
    this.cursos = _cursosService.getCursos()
   }

  ngOnInit(): void {
   CursosService.criouNovoCurso.subscribe(curso => this.cursos.push(curso))//notifica quando um novo valor é emitido

  }

}
