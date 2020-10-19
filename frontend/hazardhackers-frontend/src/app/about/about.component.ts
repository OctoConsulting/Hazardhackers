import { Component, OnInit, ViewChild } from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  imgSrc: string;

  constructor() { }

  ngOnInit(): void {
    this.imgSrc = '/assets/img/arch_diagram.png';
  }


}
