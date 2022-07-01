import {Component, Input, OnInit} from '@angular/core';
//import {EntryEditCardComponent} from "../entry-edit-card/entry-edit-card.component";

@Component({
  selector: 'app-if-entry',
  templateUrl: './if-entry.component.html',
  styleUrls: ['./if-entry.component.scss'],
})
export class IfEntryComponent implements OnInit {
  @Input() content: string;
  @Input() emotion: number;
  @Input() emotionWeight: number;
  @Input() title: string;
  @Input() id: any;
  @Input() dateTime: any;
  scaleWidth: number;
  scaleColor: any;
  emotionColors: string[] = ['#00aaff', '#e9ce00', '#55aa7f', '#ff0012'];
  xS: number;
  yS: number;

  constructor() {
    this.xS = window.visualViewport.width;
    this.yS = window.visualViewport.height;
  }

  ngOnInit() {
    this.scaleColor = this.emotionColors[this.emotion];
    this.scaleWidth = this.xS / 10;
    this.emotionWeight = this.scaleWidth * (this.emotionWeight / 100);

  }



/*
  edit() {
    const me = document.createElement('popUp');
    me.style.width = '99%';
    me.style.height = Math.floor(this.yS * 0.9).toString();
    me.style.background = 'red';
  }*/
}
