import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CursosService {


  emitirCursosCriados = new EventEmitter<string>()
  cursos: string[] = ['Angular', 'Java', 'Javascript'];

  getCursos(){
    return  this.cursos;
  }

  addCursos(curso: string){
    this.cursos.push(curso)
    this.emitirCursosCriados.emit(curso)
  }

  constructor() { }
}
