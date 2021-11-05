import { EventEmitter, Injectable } from '@angular/core';
import { LogService } from '../shared/log.service';

@Injectable({
  providedIn: 'root'
})
export class CursosService {


  emitirCursosCriados = new EventEmitter<string>()
  static criouNovoCurso = new EventEmitter<string>()
  cursos: string[] = ['Angular', 'Java', 'Javascript'];

  getCursos(){
    this._logService.consoleLog('Obtendo lista de cursos!');
    return  this.cursos;
  }

  addCursos(curso: string){
    this._logService.consoleLog('Criando novo curso: ' + curso)
    this.cursos.push(curso)
    this.emitirCursosCriados.emit(curso)
    CursosService.criouNovoCurso.emit(curso)
  }

  constructor(private _logService: LogService) { 
    console.log('CursosService')
  }
}
