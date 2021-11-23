import { HttpClient, HttpEventType, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

constructor(private http: HttpClient) { }

upload(files: Set<File>, url: string){

  const formData = new FormData() 
  files.forEach(file => {
    formData.append('file', file, file.name)
  })

  //const request = new HttpRequest('POST', url, formData ) //criando o request
  return this.http.post(url,formData, {
    observe: 'events',
    reportProgress: true
  }) //usando o request existente
  //return this.http.request(request)
  
}

download(url: string){
  return this.http.get(url, {
    responseType: 'blob' as 'json'
  })
}

handleFile(res: any, fileName: string){
  const file = new Blob([res], {
    type: res.type
  })

  const blob =window.URL.createObjectURL(file)
  const link = document.createElement('a')
  link.href = blob
  link.download = fileName

  link.click()

  window.URL.revokeObjectURL(blob)
  link.remove()

  /*pro firefox
  link.dispatchEvent(new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    view: window
  }))

  setTimeout(()=>{
    window.URL.revokeObjectURL(blob)
    link.remove()
  }, 100)
  */
}

}