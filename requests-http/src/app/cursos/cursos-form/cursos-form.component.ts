import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { CursosService } from '../cursos.service';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.css']
})
export class CursosFormComponent implements OnInit {

  form!: FormGroup
  submitted = false

  constructor(private formBuilder: FormBuilder, private service: CursosService, private modal: AlertModalService, private location: Location) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]] //recomendado maxlength no caso de banco de dados relacional para evitar erros
    })
  }

  hasError(field: string){
    return this.form.get(field)?.errors
  }

  onSubmit(){
    this.submitted = true
    console.log(this.form.value)
    if(this.form.valid){
      console.log('submit')
      this.service.create(this.form.value).subscribe(
        success => {
          this.modal.showAlertSuccess("curso criado com sucesso!")
          this.location.back() 
        },
        error => this.modal.showAlertDanger("Erro ao criar curso, tente novamente!"),
        () => console.log('completo') 
      )
    }
  }

  onCancel(){
    this.submitted = false
    this.form.reset()
    //console.log('onCancel')
  }

}
