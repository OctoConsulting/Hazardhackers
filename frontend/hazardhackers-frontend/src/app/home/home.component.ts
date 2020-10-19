import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  imgSrc: string;
  constructor() { }

  ngOnInit(): void {
    this.imgSrc = '/assets/img/hazardhacker.png';
  }

  startAnalyze(){
    window.location.assign('/image/upload');
  }

}
