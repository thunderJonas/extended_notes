import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import {Data} from '../interfaces/data';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public entry: Data[] = [];
  public loaded = false;

  constructor(private storage: Storage) {
    this.storage.create();
  }

  load(): Promise<boolean> {



    return new Promise((resolve) => {

      this.storage.get('entry').then((entry) => {

        if (entry != null){
          this.entry = entry;
        }

        this.loaded = true;
        resolve(true);
      });
    });
  }

  save(): void {
    this.storage.set('entry', this.entry);
    console.log(this.entry.length);
  }

  getData(id): Data {
    return this.entry.find(entry => entry.id === id);
  }
  getAll(){
    return this.entry;

  }

  getKey(){
    return this.entry.keys();
  }


  createNote(myId: any, title: string, content: string, emotion: number, emotionWeight: number, dateTime: any): void {
    if(myId === undefined) {
      console.log('new Entry');
      const id = Math.max(...this.entry.map(note => parseInt(note.id, 10)), 0) + 1;
      this.entry.push({
        id: id.toString(),
        title,
        content,
        emotion,
        emotionWeight,
        dateTime,
      });
    }else{
      const index = this.entry.indexOf(this.getData(myId));
      console.log(this.getData(myId));
      console.log('index ist: ' + index + '  myId ist: '+ myId);
      this.entry[index] =
        {id: myId.toString(),
        title,
          content,
          emotion,
          emotionWeight,
          dateTime
        };
    }
    this.save();
  }

  deleteNote(myId): void {
    const index = this.entry.indexOf(this.getData(myId));
    if (index > -1){
      this.entry.splice(index, 1);
      this.save();
    }
  }


  deleteAll(): void {
for(let i = this.entry.length; i > -1; i--){
  this.entry.splice(i,1);
}
    this.save();
  }

}


