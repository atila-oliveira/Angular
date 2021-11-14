import { HttpClient } from '@angular/common/http';
import { NullTemplateVisitor } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
//import 'rxjs/add/operator/map'

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {

  usuario: any = {
    nome: null,
    email: null,
    endereco:{
      cep:null,
      numero:null,
      complemento:null,
      bairro:null,
      cidade:null,
      estado:null
    }
  }

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  onSubmit(form: any){
    //console.log(form)
    //console.log(this.usuario)
    this.http.post(//'enderecoServidor/formUsuario',
    'https://httpbin.org/post',JSON.stringify(form.value)).subscribe(dados => {console.log(dados)})
  }

  consultarCEP(cep: string, form: any){
    //Nova variável "cep" somente com dígitos.
    var cep = cep.replace(/\D/g, '');

     //Verifica se campo cep possui valor informado.
     if (cep != "") {

     //Expressão regular para validar o CEP.
     var validacep = /^[0-9]{8}$/;

     //Valida o formato do CEP.
     if(validacep.test(cep)) {

      this.resetaDadosFormulario(form)
       //Consulta o webservice viacep.com.br/
       this.http.get(`https://viacep.com.br/ws/${cep}/json/`).subscribe((dados: any) => { this.populaDadosForm(dados, form)})

     }
    }

  }

  populaDadosForm(dados:any, form:any){
    /*form.setValue({
      nome: form.value.nome,
      email: form.value.email,
      endereco:{
        rua:  dados.logradouro,
        cep: dados.cep,
        numero:'',
        complemento:dados.complemento,
        bairro:dados.bairro,
        cidade:dados.cidade,
        estado:dados.estado
      }
    });*/

    form.form.patchValue({
      endereco:{
        rua:  dados.logradouro,
        cep: dados.cep,
        complemento:dados.complemento,
        bairro:dados.bairro,
        cidade:dados.localidade,
        estado:dados.uf
      }
    })
  }

  resetaDadosFormulario(form: any){
    form.form.patchValue({
      endereco:{
        rua:  null,
        cep: null,
        complemento:null,
        bairro:null,
        cidade:null,
        estado:null
      }
    })
  }
}
