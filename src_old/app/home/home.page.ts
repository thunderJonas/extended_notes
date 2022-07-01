import {Component, OnInit} from '@angular/core';
import {EntryEditCardComponent} from '../entry-edit-card/entry-edit-card.component';
import {AlertController, ModalController} from '@ionic/angular';
import {DataService} from '../service/data.service';


@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],

  }
)
export class HomePage implements OnInit {
  data: any;
  title = '';
  desc = '';
  screenW: number;
  screenH: number;

  constructor(
    public dataService: DataService,
    private modalController: ModalController,
    private alertCtrl: AlertController) {
    this.screenW = window.innerWidth;
    this.screenH = window.innerHeight;
  }

  lala() {

  }

  openEntry(title: string, description: string) {
    EntryEditCardComponent.prototype.description = description;
    EntryEditCardComponent.prototype.title = title;
    this.modalController.create({component: EntryEditCardComponent, cssClass: 'fullscreen'}).then((modalElement) => {
      modalElement.present();
    });


  }

  ngOnInit() {
    this.dataService.load();
    fetch('./assets/data/daten.json').then(res => res.json())
      .then(json => {
        this.data = json;
      });
  }

  addNote(){
    this.alertCtrl.create({
      header: 'New Note',
      message: 'What should the title of this note be?',
      inputs: [
        {
          type: 'text',
          name: 'title'
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: (data) => {
            this.dataService.createNote(data.title);
          }
        }
      ]
    }).then((alert) => {
      alert.present();
    });
  }


}
