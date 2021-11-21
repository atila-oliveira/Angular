import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent implements OnInit {

  @Input() title!: string
  @Input() corpo!: string
  @Input() cancelTxt = 'Cancelar'
  @Input() okTxt = 'Ok'

  confirmResult!: Subject<boolean>

  constructor(public modalRef: BsModalRef) { }

  ngOnInit() {
    this.confirmResult = new Subject()
  }

  onConfirm(){
    this.confirmAndClose(true)
  }

  onClose(){
    this.confirmAndClose(false)
  }

  private confirmAndClose(value: boolean){
    this.confirmResult.next(value)
    this.modalRef.hide()
  }

}
