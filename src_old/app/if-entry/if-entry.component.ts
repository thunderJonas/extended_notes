import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-if-entry',
  templateUrl: './if-entry.component.html',
  styleUrls: ['./if-entry.component.scss'],
})
export class IfEntryComponent implements OnInit {
  @Input() description: string;
  @Input() emotion: any;
  @Input() scale: number;
  @Input() title: string;
  @Input() id: any;
  scaleWidth: number;
  scaleColor: any;
  hoehe: number;
  xS: number;
  yS: number;
  constructor() {
   this.xS = window.visualViewport.width;
   this.yS = window.visualViewport.height;
 //this.scaleColor = 'rgba(255,0,0,0.5)';

  }
    ngOnInit(){
      switch (this.emotion){
        case '1': {this.scaleColor = 'rgba(255,0,0,1.0)'; break;}
        case '2': {this.scaleColor = 'rgb(255,77,0)'; break;}
        case '3': {this.scaleColor = 'rgb(0,185,255)'; break;}
        case '4': {this.scaleColor = 'rgb(255,173,3)'; break;}
      }
      this.scaleWidth= this.xS/10;
      this.scale = this.scaleWidth*(this.scale/100);

    }

    clicked(dat: any){
    console.log(dat);
    }

    edit(){
    const me = document.createElement('popUp');
    me.style.width='99%';
    me.style.height=Math.floor(this.yS*0.9).toString();
    me.style.background='red';
    }
  }


