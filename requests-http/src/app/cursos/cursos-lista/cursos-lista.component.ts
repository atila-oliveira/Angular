import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { EMPTY, empty, Observable, Subject } from 'rxjs';
import { catchError, switchMap, take, tap } from 'rxjs/operators';
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
  //bsModalRef!: BsModalRef
  deleteModalRef!: BsModalRef
  cursoSelecionado!: Curso

  @ViewChild('deleteModal') deleteModal: any  //ViewChild pega um variável criada no html

  constructor(private service: CursosService, 
   private modalService: BsModalService,
   private alertServices: AlertModalService, 
   private router: Router,
   private route: ActivatedRoute) { }

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
        return EMPTY
      })
    )
    // this.service.listar().
    // /*pipe(
    //   catchError(erro => empty()) 
    // )*/
    // subscribe(
    //   dados =>{ //escopo sucesso
    //     console.log(dados)
    //   },//escopo erro
    //   error => console.error(error),
    //   //escopo completo
    //   () => console.log('Observable completo')
      
    // )

  }

  handleError(){
    this.alertServices.showAlertDanger('Erro ao carregar cursos, tente novamente mais tarde')
      //this.bsModalRef = this.modalService.show(AlertModalComponent)
      //this.bsModalRef.content.type = 'danger'
      //this.bsModalRef.content.message = 'Erro ao carregar cursos, tente novamente mais tarde'
  }

  onEdit(id: number){
    this.router.navigate(['editar', id], {relativeTo: this.route})
  }

  onDelete(curso: Curso){
    this.cursoSelecionado = curso
    //this.deleteModalRef = this.modalService.show(this.deleteModal, {class: 'modal-sm'})
    const result$ = this.alertServices.showConfirm('Confirmação', 'Tem certeza que deseja remover esse curso?')
    result$.asObservable().pipe(take(1),switchMap(result => result ? this.service.remove(curso.id) : EMPTY)).subscribe(// se a lógica cair no EMPTY, o observable para e não executa o subscribe
      success => {
        this.onRefresh()
       // this.deleteModalRef.hide()
      },
        error => {
          //this.deleteModalRef.hide()
          this.alertServices.showAlertDanger('Erro ao remover curso, tente novamente mais tarde')}
    )
  }

  onConfirmDelete(){
    this.service.remove(this.cursoSelecionado.id).subscribe(
      success => {this.onRefresh()
      this.deleteModalRef.hide()
    },
      error => {
        this.deleteModalRef.hide()
        this.alertServices.showAlertDanger('Erro ao remover curso, tente novamente mais tarde')}
    )
  }

  onDeclineDelete(){
    this.deleteModalRef.hide()
  }
}
