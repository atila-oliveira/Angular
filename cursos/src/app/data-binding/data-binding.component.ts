import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-binding',
  templateUrl: './data-binding.component.html',
  styleUrls: ['./data-binding.component.css']
})
export class DataBindingComponent implements OnInit {

  url: string = 'http://loiane.training';
  urlImagem: string = 'https://lorempixel.com/400/200/nature';
  cursoAngular: boolean = true;
  valorAtual: string = '';
  valorSalvo: string = '';
  isMouseOver: boolean = false;

  getCurtirCurso(){
    return true;
  }

  onKeyUp(evento: KeyboardEvent){
    console.log()
    this.valorAtual = (<HTMLInputElement>evento.target).value 
  }

  salvarValor(valor: string){
    this.valorSalvo = valor;
  }

  onMouseOverOut(){
    this.isMouseOver = !this.isMouseOver;
  }

  botaoClicado(){
    alert('botão clicado')
  }

  getValor(){
    return 1;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
