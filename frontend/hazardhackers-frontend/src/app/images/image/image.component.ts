import { AwsService } from './../../aws-service/aws.service';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css'],
})
export class ImageComponent implements OnInit {

  constructor(private awsService: AwsService) {}

  imgSrc: string;
  selectedImage: any = null;
  isSubmitted: boolean;
  files: any[] = [];
  fileNames: any[] = [];
  bucketName: string;

  imageForm = new FormGroup({
    category: new FormControl('', Validators.required),
    imageUrl: new FormControl('', Validators.required),
  });

  ngOnInit() {
    this.resetForm();
  }

  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => (this.imgSrc = e.target.result);
      // reader.readAsDataURL(event.target.files[0]);
      const numOfFiles = event.target.files.length;
      for (let i = 0; i < numOfFiles; i++) {
        this.files.push(event.target.files[i]);
        this.fileNames.push(event.target.files[i].name);
      }
      console.log(this.fileNames);
    } else {
      this.imgSrc = '/assets/img/rec_upload.png';
      this.selectedImage = null;
    }
  }

  onSubmit() {

    if (this.imageForm.valid) {

      if (this.imageForm.value.category === 'hardHat'){
          this.bucketName = 'input';
      }else{
        this.bucketName = 'masks_input';
      }
      for (let i = 0; i < this.files.length; i++) {
        const file = this.files[i];
        // this.fileNames.push(file.name);
        this.awsService.fileUpload(file, file.name, this.bucketName);

      }
      this.isSubmitted = true;
    }else{
      console.log('ERROR');
    }
  }

  get formControls() {
    return this.imageForm.controls;
  }

  resetForm() {
    this.imageForm.reset();
    this.imageForm.setValue({
      imageUrl: '',
      category: '',
    });
    this.imgSrc = '/assets/img/rec_upload.png';
    this.selectedImage = null;
    this.isSubmitted = false;
  }
}
