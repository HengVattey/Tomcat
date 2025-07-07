import { Directive, HostListener, Output, EventEmitter, Input } from '@angular/core';

@Directive({
  selector: '[appDragAndDrop]',
  standalone: true // In Angular 19, standalone is often the default or preferred way
})
export class DragAndDropDirective {
  @Output() fileDropped = new EventEmitter<File[]>();
  @Input() allowedFileTypes: string[] = []; // Optional: for file type validation

  // To apply styles when an item is dragged over
  @HostListener('dragover', ['$event']) onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    // Add a class for visual feedback, e.g., this.elementRef.nativeElement.classList.add('drag-over');
  }

  // To remove styles when an item leaves the drop zone
  @HostListener('dragleave', ['$event']) onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    // Remove the class, e.g., this.elementRef.nativeElement.classList.remove('drag-over');
  }

  // When the file is dropped
  @HostListener('drop', ['$event']) onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    // Remove the class, e.g., this.elementRef.nativeElement.classList.remove('drag-over');

    const files: File[] = [];
    if (event.dataTransfer && event.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      for (let i = 0; i < event.dataTransfer.items.length; i++) {
        const item = event.dataTransfer.items[i];
        if (item.kind === 'file') {
          const file = item.getAsFile();
          if (file) {
            // Optional: validate file type
            if (this.allowedFileTypes.length === 0 || this.allowedFileTypes.includes(file.type)) {
              files.push(file);
            } else {
              console.warn(`File type not allowed: ${file.type}`);
              // You might want to emit an error or show a message to the user
            }
          }
        }
      }
    } else if (event.dataTransfer && event.dataTransfer.files) {
      // Use DataTransfer interface (fallback for older browsers)
      for (let i = 0; i < event.dataTransfer.files.length; i++) {
        const file = event.dataTransfer.files[i];
        if (file) {
          if (this.allowedFileTypes.length === 0 || this.allowedFileTypes.includes(file.type)) {
            files.push(file);
          } else {
            console.warn(`File type not allowed: ${file.type}`);
          }
        }
      }
    }

    if (files.length > 0) {
      this.fileDropped.emit(files);
    }
  }
}