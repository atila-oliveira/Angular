import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { concatMap, exhaustMap, map, mergeMap, switchMap } from 'rxjs/operators';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { Curso } from '../curso';
import { CursosService } from '../cursos.service';
import { Cursos2Service } from '../cursos2.service';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.css'],
})
export class CursosFormComponent implements OnInit {
  form!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private service: Cursos2Service,
    private modal: AlertModalService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {

    // this.route.params.subscribe(params =>{
    //   const id = params['id']
    //   console.log(id)
    //   const curso = this.service.loadById(id)
    //   curso.subscribe(curso =>{
    //     this.updateForm(curso);
    //   })
    // })

    //em casos de rotas, não é preciso fazer unsubscribe
    this.route.params.pipe(
      map((params: any) => params['id']),//vai mapear o valor recebido e retornar o valor modificado
      switchMap(id => this.service.loadByID(id)), //retorna outro observable
      //switchMap cancela requisições antriores e retorna apenas o último pedido
      //switchMap(curso => obterAulas)

    ).subscribe(curso => this.updateForm(curso))

    //concatMap -> create ou update ou delete. Ordem da requisição importa
    //mergeMap -> ordem não importa
    //exhaustMap -> faz requisição e aguarda a resposta antes de uma nova requisição. comum em login 

    this.form = this.formBuilder.group({
      id: [null],
      nome: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(250),
        ],
      ], //recomendado maxlength no caso de banco de dados relacional para evitar erros
    });
  }

  updateForm(curso: any){
    this.form.patchValue({
      id: curso.id,
      nome: curso.nome
    })
  }

  hasError(field: string) {
    return this.form.get(field)?.errors;
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.form.value);
    if (this.form.valid) {
      console.log('submit');

      let msgSucesso = 'Curso criado com sucesso'
      let msgErro = "Erro ao criar o curso"
      if(this.form.value.id){
        msgSucesso = 'Curso atualizado com sucesso'
        msgErro = 'Erro ao atualizar curso, tente novamente!'
      }

      this.service.save(this.form.value).subscribe(
        success => {
          this.modal.showAlertSuccess('curso atualizado com sucesso!');
          this.location.back();
        },
        error => {this.modal.showAlertDanger('Erro ao atualizar curso, tente novamente!')}
      )
      /*if(this.form.value.id){
        //update
        this.service.update(this.form.value).subscribe(
          (success) => {
            this.modal.showAlertSuccess('curso atualizado com sucesso!');
            this.location.back();
          },
          (error) =>
            this.modal.showAlertDanger('Erro ao atualizar curso, tente novamente!'),
          () => console.log('update completo')
        )
      }else{
        //create
        this.service.create(this.form.value).subscribe(
          (success) => {
            this.modal.showAlertSuccess('curso criado com sucesso!');
            this.location.back();
          },
          (error) =>
            this.modal.showAlertDanger('Erro ao criar curso, tente novamente!'),
          () => console.log('completo')
        );
      }*/
    }
  }

  onCancel() {
    this.submitted = false;
    this.form.reset();
    //console.log('onCancel')
  }
}
