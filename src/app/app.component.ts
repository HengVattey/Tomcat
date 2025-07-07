import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TestService } from './test.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { DragAndDropDirective } from './drag-and-drop.directive';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CommonModule, DragAndDropDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AngDeploy';
  getStr:String='';
droppedImages: { file: File, url: SafeUrl }[] = [];
  // Define allowed image types
//   allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
//   constructor(private sanitizer: DomSanitizer) {}
//  onFilesDropped(files: File[]) {
//     console.log('Files dropped:', files);
//     this.droppedImages = []; // Clear previous images if you only want to display the latest drop

//     files.forEach(file => {
//       // You can perform further validation or processing here
//       const imageUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file));
//       this.droppedImages.push({ file, url: imageUrl });

//       // Example: Upload the file to a server
//       // this.uploadFile(file);
//     });
//   }

//   onFileSelected(event: Event) {
//     const input = event.target as HTMLInputElement;
//     if (input.files && input.files.length > 0) {
//       const filesArray = Array.from(input.files);
//       this.onFilesDropped(filesArray); // Reuse the same logic as for dropped files
//     }
//   }
//   // Example: Function to upload a file (you'd replace this with your actual API call)
//   uploadFile(file: File) {
//     const formData = new FormData();
//     formData.append('image', file, file.name);

//     // In a real application, you'd use Angular's HttpClient to send this to your backend
//     console.log('Simulating file upload for:', file.name, formData);
//     // this.http.post('/api/upload-image', formData).subscribe(...);
//   }


constructor(private st:TestService){
this.getD();
}

getD():void{

  this.st.get().subscribe(data=>{
    this.getStr=data;
    console.log(this.getStr);
  });


}
}



