import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onChange(evento: any){
    console.log(evento)

   const selectedFiles = <FileList> evento.srcElement.files
  //document.getElementById('customFileLabel').innerHTML = selectedFiles[0].name;

  const filesName = []

  for(let i = 0; i < selectedFiles.length; i++){
    filesName.push(selectedFiles[i].name)
  }
 let elemento: any = document.getElementById('customFileLabel')
  elemento.innerHTML =  filesName.join(', ');
  }

}
