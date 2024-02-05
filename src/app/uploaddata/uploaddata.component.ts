import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-uploaddata',
  templateUrl: './uploaddata.component.html',
  styleUrl: './uploaddata.component.css',
})
export class UploaddataComponent {
  constructor(private http: HttpClient) {}

  fileSelected = false;
  file: File | null = null;
  fileError = '';
  flag: boolean = true;

  onFileChange(event: any): void {
    const fileList: FileList = event.target.files as FileList;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      const fileType = file.name.split('.').pop();

      if (fileType === 'xlsx' || fileType === 'xls') {
        this.file = file;
        this.fileSelected = true;

        this.fileError = '';
      } else {
        this.fileSelected = false;
        this.fileError = `${fileType} is not accepted`;
      }
    }
  }

  upload(): void {
    if (this.file) {
      const fileReader = new FileReader();
      fileReader.onload = (e: any) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const jsonData = XLSX.utils.sheet_to_json(
          workbook.Sheets[workbook.SheetNames[0]]
        );
        this.flag = false;

        setTimeout(() => {
          this.flag = true;
        }, 2000);
        console.log('JSON Data:', jsonData);
      };
      fileReader.readAsArrayBuffer(this.file);
    }
  }
}
