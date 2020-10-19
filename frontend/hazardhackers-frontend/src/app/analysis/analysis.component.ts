import { environment } from './../../environments/environment';
import { AwsService } from './../aws-service/aws.service';
import { AnalysisService } from './analysis.service';
import { Component, OnInit, Input } from '@angular/core';
import { data } from './analysis-dummy-data';
import { AnalysisData, ResponseData } from './analysis-data.model';
import { forkJoin } from 'rxjs';
import { Json } from 'aws-sdk/clients/robomaker';


@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.css']
})
export class AnalysisComponent implements OnInit {

  @Input() fileNames: [];
  @Input() bucketName: string;
  public imageResults: AnalysisData[] = [];
  public isAnalyzing: boolean = true;
  private retryList: string[] = [];
  private retryCounter: number = 0;
  public showAlert = false;
  private pageIndex: number = 0;
  private url = environment.outputUrl;


  constructor(private awsService: AwsService) {}

  ngOnInit(): void {

    this.bucketName = (this.bucketName === 'input')? 'output' : 'masks_output';
    //each analysis takes about 5 seconds
    setTimeout(() => this.getAnalysisImage(this.fileNames), this.fileNames.length * 5000);
  }

  async getAnalysisImage(fileList) {
    this.retryCounter++;
    for(let elem of fileList){
        try{
          let data = await this.awsService.fileDownload(elem, this.bucketName);
          const output = data[0].$response['request'].params.Key;
          const jsonData = JSON.parse(data[1].Body.toString());
          this.parseData(output, jsonData);
          let index = this.retryList.indexOf(elem);
          if(index != -1){
            // delete this.retryList[index];
            this.retryList.splice(index, 1);
          }
        }
        catch(err){
          console.log("caught error while calling aws");
          this.retryList.push(elem);
          this.getAnalysisImage(this.retryList);
        }
        this.isAnalyzing = false;
    }
    // if(this.retryList.length > 0 && this.retryCounter < 2){
    //   this.getAnalysisImage(this.retryList);
    // }
    // if(this.retryList.length > 0 && this.retryCounter >= 2){
    //   this.showAlert = true;
    // }
    // this.showAlert = (this.retryList.length > 0)? true : false;

  }

  parseData(image: string, data: Json){
    var analysis: AnalysisData = new AnalysisData();
    var response: ResponseData = new ResponseData();

    analysis.image = this.url+image;
    analysis.type = (this.bucketName === 'masks_output')? 'Face Masks' : 'Hard Hats';

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


  pageEvent(event){
    this.pageIndex = event.pageIndex;
  }

}
