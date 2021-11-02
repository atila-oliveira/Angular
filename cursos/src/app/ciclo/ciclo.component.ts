import { AfterContentChecked, AfterContentInit, AfterViewChecked, Component, DoCheck, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-ciclo',
  templateUrl: './ciclo.component.html',
  styleUrls: ['./ciclo.component.css']
})
export class CicloComponent implements OnInit, OnChanges, OnInit, DoCheck, AfterContentInit, AfterContentChecked, AfterViewChecked, OnDestroy { //boa práticar implementar interfaces dos ciclos de vida

  @Input() valorInicial: number = 10;

  constructor() { 
    console.log('CONSTRUTOR')
  }

  //ocorre quando valor de um property-binding é atualizado
  ngOnChanges() {
    console.log('ngOnChanger')
  }

  //ocorre quando o component é inicializado
  ngOnInit(): void {
    console.log('ngOnInit');
  }

  //ocorre a cada ciclo de verificação de mudanças
  ngDoCheck() {
    console.log('ngDoCheck')
  }

  //ocorre depois que é inserido um conteúdo externo na view
  ngAfterContentInit() {
    console.log('ngAfterContentInit')
  }

  //ocorre a cada verificação de conteúdo inserido
  ngAfterContentChecked() {
    console.log('ngAfterContentChecked')
  }

  //ocorre a cada verificação de conteúdo / conteúdo filho
  ngAfterViewChecked() {
    console.log('ngAfterViewChecked')
  }

  //ocorre antes de uma diretiva/component ser destruído 
  ngOnDestroy() {
    console.log('ngOnDestroy')
  }

}
