import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';

export enum AlertTypes{
  DANGER= 'danger',
  SUCCESS= 'success'
}

@Injectable({
  providedIn: 'root'
})
export class AlertModalService {

constructor(private modalService: BsModalService) { }

private showAlert(message: string, type: AlertTypes, dismissTimeOut?: number){//? torna o parâmetro opcional
  const bsModalRef:BsModalRef = this.modalService.show(AlertModalComponent)
  bsModalRef.content.type = type
  bsModalRef.content.message = message

  if(dismissTimeOut){
    setTimeout(() => bsModalRef.hide(), dismissTimeOut)
  }

}

showAlertDanger(message: string){
  this.showAlert(message, AlertTypes.DANGER)
}
showAlertSuccess(message: string){
  this.showAlert(message, AlertTypes.SUCCESS, 3000)
}

showConfirm(title: string, corpo: string, okTxt?: string, cancelTxt?: string){
  const bsModalRef:BsModalRef = this.modalService.show(ConfirmModalComponent)
  bsModalRef.content.title = title
  bsModalRef.content.corpo = corpo

  if(okTxt){
    bsModalRef.content.okTxt = okTxt
  }
  if(cancelTxt){
    bsModalRef.content.cancelTxt = cancelTxt
  }

  return (<ConfirmModalComponent>bsModalRef.content).confirmResult

}
}