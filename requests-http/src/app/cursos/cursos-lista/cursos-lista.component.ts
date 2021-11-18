import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { empty, Observable, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { AlertModalComponent } from 'src/app/shared/alert-modal/alert-modal.component';
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
  erro$ = new Subject<boolean>()
  bsModalRef!: BsModalRef

  constructor(private service: CursosService, 
   // private modalService: BsModalService
   private alertServices: AlertModalService) { }

  ngOnInit(): void {
    //lembrar que sempre que tiver um subscribe precisará ter um unsubscribe
   //this.service.listar().subscribe(dados => this.cursos = dados)
    this.onRefresh()
  }

  onRefresh(){
    this.cursos$ = this.service.listar().pipe(
      catchError(erro => {
        console.error(erro)
        //this.erro$.next(true)
        this.handleError();
        return empty()
      })
    )
    this.service.listar().
    /*pipe(
      catchError(erro => empty()) 
    )*/
    subscribe(
      dados =>{ //escopo sucesso
        console.log(dados)
      },//escopo erro
      error => console.error(error),
      //escopo completo
      () => console.log('Observable completo')
      
    )

  }

  handleError(){
    this.alertServices.showAlertDanger('Erro ao carregar cursos, tente novamente mais tarde')
      //this.bsModalRef = this.modalService.show(AlertModalComponent)
      //this.bsModalRef.content.type = 'danger'
      //this.bsModalRef.content.message = 'Erro ao carregar cursos, tente novamente mais tarde'
  }
}
