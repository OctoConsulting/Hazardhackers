import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  imageAnalysis(){
    window.location.assign('/image/upload');
  }
  processImages(){
    window.location.assign('/image/list');
  }
}
