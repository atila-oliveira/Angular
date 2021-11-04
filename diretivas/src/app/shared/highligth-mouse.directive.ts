import { Directive, ElementRef, HostBinding, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[HighligthMouse]'
})
export class HighligthMouseDirective {

  @HostListener('mouseenter') onMouseOver(){
      //this._render.setStyle(this._elementRef.nativeElement, 'backgroundColor', 'yellow')
      this.backgroundColor = 'yellow'
  }

  @HostListener('mouseleave') onMouseLeave(){
    //this._render.setStyle(this._elementRef.nativeElement, 'backgroundColor', 'white')
    this.backgroundColor = 'white'
  }

  //@HostBinding('style.backgroundColor')
  //backgroundColor!: string;

  @HostBinding('style.backgroundColor') get setColor(){
    return this.backgroundColor
  }
  backgroundColor!: string;
  
  constructor(private _elementRef: ElementRef, private _render: Renderer2) { }

}
