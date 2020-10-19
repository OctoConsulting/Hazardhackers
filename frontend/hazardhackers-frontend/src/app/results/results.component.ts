import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-results-component',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  @Input() imageResults;
  @Input() pageIndex;
  
  constructor() { }

  ngOnInit(): void {
  }

}
