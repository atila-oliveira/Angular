import { Directive, ElementRef, HostBinding, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[Highlight]'
})
export class HighlightDirective {

  @HostListener('mouseenter') onMouseOver(){
    //this._render.setStyle(this._elementRef.nativeElement, 'backgroundColor', 'yellow')
    this.backgroundColor = this.highlightColor
}

@HostListener('mouseleave') onMouseLeave(){
  //this._render.setStyle(this._elementRef.nativeElement, 'backgroundColor', 'white')
  this.backgroundColor = this.defaultColor
}

@Input() defaultColor: string = 'white';
@Input('Highlight') highlightColor: string = 'amarelo'


//@HostBinding('style.backgroundColor')
//backgroundColor!: string;

@HostBinding('style.backgroundColor') get setColor(){
  return this.backgroundColor
}
backgroundColor!: string;

constructor(private _elementRef: ElementRef, private _render: Renderer2) { }

ngOnInit(){
  this.backgroundColor = this.defaultColor
}

}
