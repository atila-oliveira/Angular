import { ConsultaCepService } from './../shared/services/consulta-cep.service';
import { DropdownService } from './../shared/services/dropdown.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EstadosBr } from '../shared/models/estados-br';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {

  formulario!: FormGroup;
  // estados!: EstadosBr[]
  estados!: Observable<EstadosBr[]>
  cargos!: any[]
  tecnologias!: any[]
  newsletterOP!: any[]
  frameworks: string[] = ['Angular', 'React', 'Vue', 'Sencha']

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private dropdownService: DropdownService, private cepService: ConsultaCepService) { }

  ngOnInit(): void {

    this.cargos = this.dropdownService.getCargos()
    this.tecnologias = this.dropdownService.getTecnologias()
    this.estados = this.dropdownService.getEstadosBR()
    this.newsletterOP = this.dropdownService.getNewsletter()
    /*this.formulario = new FormGroup({
       //cada campo (chave) é um controle de formulário
       nome: new FormControl(null),
       email: new FormControl(null),
 
       endereco: new FormGroup({
         cep: new FormControl(null)
       })
     })*/

    /*  this.dropdownService.getEstadosBR()
      .subscribe(dados => {
        this.estados = dados
        console.log(dados)
      })*/

    this.formulario = this.formBuilder.group({
      //primeira posição do array é um valor padrão no campo
      nome: [null, Validators.required],
      //nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: [null, [Validators.required, Validators.email]],
      endereco: this.formBuilder.group({
        cep: [null, Validators.required],
        numero: [null, Validators.required],
        complemento: [null],
        rua: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required]
      }),
      cargo: [null],
      tecnologia: [null],
      newsletter: ['s'],
      termos: [null, Validators.pattern('true')],
      frameworks: this.buildFrameworks()
    })
  }

  buildFrameworks() {

    const values = this.frameworks.map(v => new FormControl(false))
    return this.formBuilder.array(values)
    /*return[
      new FormControl(false),
      new FormControl(false),
      new FormControl(false),
      new FormControl(false)
    ]*/
  }
  getFrameworksControls() {
    return this.formulario.get('frameworks') ? (<FormArray>this.formulario.get('frameworks')).controls : null;
  }
  onSubmit() {
    console.log(this.formulario)

    if (this.formulario.valid) {
      this.http.post(//'enderecoServidor/formUsuario',
        'https://httpbin.org/post', JSON.stringify(this.formulario.value)).subscribe(dados => {
          console.log(dados)
          //reseta o formulario
          //this.formulario.reset();
          this.resetar()
        }, (erro: any) => alert('erro'))

    } else {
      console.log("formulario invalido")
      this.verificaValidacoesFormulario(this.formulario)

    }

  }

  verificaValidacoesFormulario(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(campo => {
      console.log(campo)
      const controle = formGroup.get(campo)
      controle?.markAsDirty()
      if (controle instanceof FormGroup) {
        this.verificaValidacoesFormulario(controle)
      }
    })
  }

  resetar() {
    this.formulario.reset()
  }

  consultarCEP() {

    let cep = this.formulario.get('endereco.cep')?.value

    if (cep != null && cep !== '') {
      this.cepService.consultarCEP(cep).subscribe((dados: any) => { this.populaDadosForm(dados) })
    }

  }

  populaDadosForm(dados: any) {

    this.formulario.patchValue({
      endereco: {
        rua: dados.logradouro,
        cep: dados.cep,
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    })

    this.formulario.get('nome')?.setValue('Juca')
  }

  resetaDadosFormulario() {
    this.formulario.patchValue({
      endereco: {
        rua: null,
        cep: '',
        complemento: null,
        bairro: null,
        cidade: null,
        estado: null
      }
    })
  }

  setarCargo() {
    const cargo = { nome: 'Dev', nivel: 'Pleno', desc: 'Dev pl' }
    this.formulario.get('cargo')?.setValue(cargo)
  }

  setarTecnologias() {
    this.formulario.get('tecnologia')?.setValue(['Java', 'Javascript', 'PHP'])
  }

  compararCargos(obj1: any, obj2: any) {
    return obj1 && obj2 ? (obj1.nome === obj2.nome && obj1.nivel === obj2.nivel) : obj1 === obj2;

  }

  compararTecnologia(obj1: any, obj2: any) {
    return obj1 && obj2 ? (obj1.nome === obj2.nome && obj1.nivel === obj2.nivel) : obj1 === obj2;

  }

}
