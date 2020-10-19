import { delay } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import { Observable, of } from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AwsService {
  private bucket = new S3(
        {
          accessKeyId: environment.accessKeyId,
          secretAccessKey: environment.secretAccessKey,
          region: environment.region,
        }
    );

  constructor() { }

  fileUpload(file, fileName, bucketName) {
    const contentType = file.type;

    const params = {
        Bucket: 'hack-input/' + bucketName,
        Key:  fileName,
        Body: file,
        ACL: 'public-read',
        ContentType: contentType
    };
    this.bucket.upload(params, function (err, data) {
        if (err) {
            console.log('EROR: ',JSON.stringify( err));
            return false;
        }
        console.log('File Uploaded.', data);
        return true;
    });
  }





  async fileDownload(fileName, bucketName){
    const params = {
      Bucket: 'hack-input/' + bucketName,
      Key: fileName
   };
    let resultArray = [];
    let jsonResults = fileName.split('.')[0] + '.json';
    resultArray.push(await this.bucket.getObject(params, (err:any, data:any) =>{}).promise());
    params.Key = jsonResults;
    resultArray.push(await this.bucket.getObject(params, (err:any, data:any) =>{}).promise());

    return resultArray;
  }

  async jsonDownload(fileName, bucketName){
    const params = {
      Bucket: 'hack-input/' + bucketName,
      Key: fileName
   };
    return await this.bucket.getObject(params, (err:any, data:any) =>{}).promise();

  }

  async getAll(prefix){
    const params = {
      Bucket: 'hack-input',
      Prefix: prefix
    }
    return await this.bucket.listObjectsV2(params, (err:any, data:any) => {}).promise();
  }
}
