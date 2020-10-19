import { environment } from './../../../environments/environment';
import { AwsService } from './../../aws-service/aws.service';
import { Component, OnInit } from '@angular/core';
import { AnalysisData, ResponseData } from 'src/app/analysis/analysis-data.model';
import { Json } from 'aws-sdk/clients/robomaker';

// import { ImageService } from 'src/app/shared/image.service';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.css']
})
export class ImageListComponent implements OnInit {
  hatList: any[] = [];
  maskList: any[] = [];
  imageList: any[] = [];
  // rowIndexArray: any[];
  imageLength: number = 0;
  public imageResults: AnalysisData[] = [];
  pageIndex = 0;
  imageClicked = false;

  constructor(private awsService: AwsService) { }

  ngOnInit() {
  }

  async getHats(){
    try{
      console.log("calling Hat")
      let hatData = await this.awsService.getAll('output');
      for(let elem of hatData.Contents){
        if(elem.Key.split('.')[1] === 'jpg')
          this.imageList.push(environment.outputUrl + elem.Key);
      }
    }
    catch(err){
      console.log("error in hat")
      this.getHats();
    }
  }

  async getMasks(){
    try{
      console.log("Calling Mask")
      let maskData = await this.awsService.getAll('masks_output');
      console.log(maskData)
      for(let elem of maskData.Contents){
        if(elem.Key.split('.')[1] === 'jpg')
          this.imageList.push(environment.outputUrl + elem.Key);
      }
    }
    catch(err){
      console.log("error in mask")
      this.getMasks();
    }
  }

  async photoClicked(image){
    try{
      let urls = image.split('/');
      let bucket = urls[urls.length-2];
      let key = (urls[urls.length-1].split('.')[0]);

      let data = await this.awsService.jsonDownload(key+'.json', bucket);
      const jsonData = JSON.parse(data.Body.toString());
      this.parseData(image, jsonData, bucket);
      this.imageClicked = true;
    }
    catch(err){
      console.log("caught err while downloading json for image");
      this.photoClicked(image);
    }
  }

  parseData(image: string, data: Json, bucket: string){
    var analysis: AnalysisData = new AnalysisData();
    var response: ResponseData = new ResponseData();

    analysis.image = image;
    analysis.type = (bucket === 'masks_output')? 'Face Masks' : 'Hard Hats';
    
    response.people_fail = (data['without_masks'])? data['without_masks'] : data['heads'];
    response.people_pass = (data['with_masks'])? data['with_masks'] : data['helmets'];
    if(response.people_fail){
      response.passed = false;
    }
    else{
      response.passed = true;
    }

    analysis.data = response;
    this.imageResults.push(analysis);
  }

}