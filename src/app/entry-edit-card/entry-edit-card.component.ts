import {Component, AfterViewInit, OnInit, Inject, Input} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {DataService} from '../services/data.service';

@Component({
  selector: 'app-entry-edit-card',
  templateUrl:  './entry-edit-card.component.html',
  styleUrls: ['./entry-edit-card.component.scss', '../emotion/emotion.component.scss'],
})

export class EntryEditCardComponent implements OnInit, AfterViewInit{
  @Input() id: string;
  @Input() title: string;
  @Input() content: string;
  @Input() dateTime: any;
  @Input() emotion: number;
  @Input() emotionWeight: number;
  screenW: number;
  screenH: number;
  buttonLeft: number;
  constructor(private modalController: ModalController, private entry: DataService) {
    this.screenW = window.innerWidth;
    this.screenH = window.innerHeight;
    this.buttonLeft = 20;

  }

  ngOnInit() {

  }

  ngAfterViewInit() {

   }

  //X-Position zentriert zurückgeben
  centerX(position: number, objectWidth: number) {
    return position - objectWidth / 2;
  }

  //Y-Position zentriert zurückgeben
  centerY(position: number, objectHeight: number) {
    return position - objectHeight / 2;
  }


public setEmotion(emotion){
    this.emotion = emotion;
}

public  setEmotionWeight(emotionWeight){
    this.emotionWeight = emotionWeight;
}

  close(){
    this.modalController.dismiss();
  }

  //Einstrag speichern und PopUp schließen
  saveEntry() {
    let msg: number = null;
    if(this.title === ''){
      const conrad = document.getElementById('title').style;
      conrad.border = '1px solid rgba(142,0,130,0.2)';
      conrad.borderRadius = '12px';
      msg++;
    }
    if(this.content === ''){
      const conrad = document.getElementById('content').style;
      conrad.border = '1px solid rgba(142,0,130,0.2)';
      conrad.borderRadius = '12px';
      msg++;
    }
    if(msg ===null) {
      const date = new Date();
      this.entry.createNote(this.id, this.title,this.content,this.emotion,this.emotionWeight,date.getDate() +'.'
        + date.getMonth() + '.' + date.getFullYear());
      this.modalController.dismiss();
    }
  }
  //Blockieren der Enter-Taste
  blockEnter($event: any) {
    if ($event.key === 'Enter') {
      $event.preventDefault();
    }
  }



  //Rückgabewert als String mit "px"
  private pixValue(value: number) {
    return Math.floor(value).toString() + 'px';
  }

}
