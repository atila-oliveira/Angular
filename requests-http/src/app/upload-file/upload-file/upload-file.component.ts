import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UploadFileService } from '../upload-file.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {

  files!: Set<File>
  progress = 0

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
  this.progress = 0;
  }

  onUpload(){
    if(this.files && this.files.size > 0){
      this.uploadService.upload(this.files, '/api/upload').subscribe((event: HttpEvent<Object>) => {
        //console.log(event)
        if(event.type === HttpEventType.Response){
          console.log('Upload Concluído')
        } else if(event.type === HttpEventType.UploadProgress && event.total){
          const percent = Math.round((event.loaded * 100) / event.total)
          //console.log('Progreso', percent)
          this.progress = percent;
        }
      })
    }
  }

  onDownloadPDF(){
    this.uploadService.download('/api/downloadPDF').subscribe((res:any)=>{
      this.uploadService.handleFile(res, 'teste.pdf')
    })
  }

  onDownloadExcel(){
    this.uploadService.download('/api/downloadExcel').subscribe((res:any)=>{
      this.uploadService.handleFile(res, 'teste.xls')
    })
  }

}