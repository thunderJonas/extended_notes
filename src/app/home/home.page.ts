import {Component, OnInit} from '@angular/core';
import {EntryEditCardComponent} from '../entry-edit-card/entry-edit-card.component';
import {ModalController} from '@ionic/angular';
import {DataService} from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],

}
)
export class HomePage implements OnInit{
 id: string;
  title = '';
  content = '';
  emotion: number;
  emotionWeight: number;
  dateTime: any;
  screenW: number;
  screenH: number;
  constructor(
     private modalController: ModalController, private entry: DataService) {
  this.screenW = window.innerWidth;
  this.screenH = window.innerHeight;
  }

delAllEntrys() {
    this.entry.deleteAll();
    this.entry.save();
}

newEntry(){
  EntryEditCardComponent.prototype.id = this.id;
  EntryEditCardComponent.prototype.content = this.content;
  EntryEditCardComponent.prototype.title = this.title;
  EntryEditCardComponent.prototype.dateTime = this.dateTime;
  EntryEditCardComponent.prototype.emotion = this.emotion;
  EntryEditCardComponent.prototype.emotionWeight = this.emotionWeight;
    this.modalController.create({component: EntryEditCardComponent, cssClass: ['fullscreen']}).then((modalElement) => {
      modalElement.present();
    });
}

deleteEntry(myId){
    this.entry.deleteNote(myId);
}

 editEntry(id: string, title: string, content: string, emotion: number, emotionWeight: number, dateTime: any) {
    EntryEditCardComponent.prototype.id = id;
    EntryEditCardComponent.prototype.content = content;
   EntryEditCardComponent.prototype.title = title;
   EntryEditCardComponent.prototype.dateTime = dateTime;
   EntryEditCardComponent.prototype.emotion = emotion;
   EntryEditCardComponent.prototype.emotionWeight = emotionWeight;
   this.modalController.create({component: EntryEditCardComponent, cssClass: ['fullscreen']}).then((modalElement) => {
     modalElement.present();
   });

 }
  ngOnInit() {
this.entry.load();

  }




}
