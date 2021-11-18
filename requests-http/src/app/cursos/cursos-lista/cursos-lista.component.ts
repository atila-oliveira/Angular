import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Curso } from '../curso';
import { CursosService } from '../cursos.service';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.css'],
  preserveWhitespaces: true
})
export class CursosListaComponent implements OnInit {

  //cursos!: Curso[]
  cursos$!: Observable<Curso[]>

  constructor(private service: CursosService) { }

  ngOnInit(): void {
    //lembrar que sempre que tiver um subscribe precisará ter um unsubscribe
   //this.service.listar().subscribe(dados => this.cursos = dados)

   this.cursos$ = this.service.listar()

  }

}
