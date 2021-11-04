import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: 'p[FundoAmarelo]' //inserir a tag na frente do selector faz o comportamento ser aplicado somente nessa tag 
})
export class FundoAmareloDirective {



  constructor(private _elementRef: ElementRef, private _render: Renderer2) { 
    //console.log(this._elementRef)
    //this._elementRef.nativeElement.style.backgroundColor = 'yellow'; Não indicado por questão de segurança
    this._render.setStyle(this._elementRef.nativeElement, 'backgroundColor', 'yellow')
  }

}
