import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'camelCase'
})
export class CamelCasePipe implements PipeTransform {

  transform(value: any, ...args: any): any {
    let values = value.split(' ');
    let result = '';

    for (let v of values){
      result += this.capitalize(v) + ' ';
    }
    return result;
  }

  capitalize(value: string){
    //pega o caractere da posição 0 e o transforma em maiuscula
    return value.substr(0,1).toUpperCase() + 
    value.substr(1).toLowerCase() //pega os caracteres após a posição 0 e transforma em minusculo

  }

}
