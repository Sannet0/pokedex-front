import { Component, OnInit } from '@angular/core';
import { FilesService } from '../services/files.service';

@Component({
  selector: 'app-file-manage-page',
  templateUrl: './file-manage-page.component.html',
  styleUrls: ['./file-manage-page.component.scss']
})
export class FileManagePageComponent implements OnInit {

  currentFileName = '';
  currentFile: any;
  formData: FormData = new FormData();
  fileList: string[] = [];
  isBucketCreated: boolean;

  constructor(private readonly filesService: FilesService) { }

  ngOnInit(): void {
    this.isAutoCreatedBucketExist();
  }

  isAutoCreatedBucketExist() {
    this.filesService.isAutoCreatedBucketExist().subscribe((value) => {
      this.isBucketCreated = value.isAutoCreatedBucketExist;
      if (this.isBucketCreated) {
        this.getFileList();
      }
    });
  }

  createBucket() {
    this.filesService.createBucket().subscribe(() => {
      this.isBucketCreated = true;
    });
  }

  deleteBucket() {
    this.filesService.deleteBucket().subscribe(() => {
      this.fileList = [];
      this.isBucketCreated = false;
    });
  }

  getFileList() {
    this.filesService.fileList().subscribe((fileList: string[]) => {
      this.fileList = fileList;
    });
  }

  uploadFileData(event: any) {
    this.currentFile = event;
    this.currentFileName = this.currentFile.files[0].name.split('.')[0];
  }

  uploadFile () {
    const file: File = this.currentFile.files.item(0);
    const trimmedFileName: string = this.currentFileName.trim();

    if (file && trimmedFileName) {
      this.formData.append('file', file, file.name);
      this.filesService.uploadFile(trimmedFileName, this.formData).subscribe(() => {
        this.getFileList();
      });

      this.currentFile.value = '';
      this.formData = new FormData();
      this.currentFileName = '';
    }
  }

  deleteFile(fileName: string) {
    const trimmedFileName = fileName.trim();

    if (trimmedFileName) {
      this.filesService.deleteFile(trimmedFileName).subscribe(() => {
        this.getFileList();
      });
    }
  }

}
