import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(private apiService: ApiService) { }

  isAutoCreatedBucketExist() {
    return this.apiService.isAutoCreatedBucketExist();
  }

  createBucket() {
    return this.apiService.createBucket();
  }

  deleteBucket() {
    return this.apiService.deleteBucket();
  }

  uploadFile(name: string, file: FormData) {
    return this.apiService.uploadFile(name, file);
  }

  deleteFile(name: string) {
    return this.apiService.deleteFile(name);
  }

  downloadFile(name: string) {
    return this.apiService.downloadFile(name);
  }

  fileList() {
    return this.apiService.fileList();
  }
}
