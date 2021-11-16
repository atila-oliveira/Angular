import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EstadosBr } from '../models/estados-br';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

constructor(private http: HttpClient) { }

getEstadosBR(){
  return this.http.get<EstadosBr[]>('assets/dados/estadosbr.json')
}

getCargos(){
  return [
    {nome: 'Dev', nivel: 'Junior', desc: 'Dev jr'},
    {nome: 'Dev', nivel: 'Pleno', desc: 'Dev pl'},
    {nome: 'Dev', nivel: 'Senior', desc: 'Dev sr'}
  ]
}

getTecnologias(){
  return [
    {nome: 'Java', desc: 'Java'},
    {nome: 'Javascript', desc: 'Javascript'},
    {nome: 'PHP', desc: 'PHP'},
    {nome: 'Ruby', desc: 'Ruby'},
  ]
}

getNewsletter(){
  return [
    {valor: 's', desc: 'Sim'},
    {valor: 'n', desc: 'Não'}
  ]
}

}
