import { Component, OnInit } from '@angular/core';
import { UploadFileService } from '../upload-file.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {

  files!: Set<File>

  constructor(private uploadService: UploadFileService) { }

  ngOnInit(): void {
  }

  onChange(evento: any){
    console.log(evento)

   const selectedFiles = <FileList> evento.srcElement.files
  //document.getElementById('customFileLabel').innerHTML = selectedFiles[0].name;

  const filesName = []
  this.files = new Set()

  for(let i = 0; i < selectedFiles.length; i++){
    filesName.push(selectedFiles[i].name)
    this.files.add(selectedFiles[i])
  }
 let elemento: any = document.getElementById('customFileLabel')
  elemento.innerHTML =  filesName.join(', ');
  }

  onUpload(){
    if(this.files && this.files.size > 0){
      this.uploadService.upload(this.files, '/api/upload').subscribe(response => console.log('Upload Concluído'))
    }
  }

}
