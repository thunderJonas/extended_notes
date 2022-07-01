import {Component, OnInit, AfterViewInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {Animation,AnimationController} from '@ionic/angular';

@Component({
  selector: 'app-entry-edit-card',
  templateUrl: './entry-edit-card.component.html',
  styleUrls: ['./entry-edit-card.component.scss'],
})
export class EntryEditCardComponent implements OnInit, AfterViewInit{
 title: string;
 description: string;
 readOnlyTitle = false;
 readOnlyDesc = false;
 screenW: number;
screenH: number;
 buttonTop: string;
 buttonLeft: string;
  emojiSize: string;
  trash: number;
  emoA: Animation;
  emoB: Animation;
  emoC: Animation;
  emoD: Animation;
  deckel: Animation;
 emoAnimation: Animation;
 animiBackwards = false;
 emojis: string[] = ['sad-outline', 'happy-outline', 'logo-reddit', 'logo-github'];
 emojiSrc: string[] = ['./assets/emojis/happy.svg','./assets/emojis/fear.svg','./assets/emojis/sad.svg','./assets/emojis/angry.svg'];
 constructor(private modalController: ModalController, private animiCtrl: AnimationController) {
   this.screenW = window.innerWidth;
   this.screenH = window.innerHeight;
   this.buttonLeft = '20'; //Math.floor(this.screenW/2-50).toString();
   this.buttonTop = Math.floor(this.screenH - 70).toString();
   this.emojiSize = Math.floor(this.screenW / 8).toString()+'px';
   this.trash = Math.floor(this.screenW / 8);
 }

  ngAfterViewInit() {
    this.emoA = this.animiCtrl.create()
      .addElement(document.getElementById(this.emojis[0]))
      .duration(600)
      .easing('ease-in-out')
      .keyframes([
        {offset: 0, transform: 'scale(0.1)'},
        {offset: 1, transform: 'scale(1.3) translateX(-'+this.trash*0.9+'px) translateY(-'+this.trash*3+'px) rotate(-360deg) '}
      ]);

    this.emoB = this.animiCtrl.create()
      .addElement(document.getElementById(this.emojis[1]))
      .duration(600)
      .easing('ease-in-out')
      .keyframes([
        {offset: 0, transform: 'scale(0.1)'},
        {offset: 1, transform: 'scale(1.3) translateX('+this.trash*2.5+'px) translateY(-'+this.trash*1.5+'px) rotate(720deg)'}
      ]);

    this.emoC = this.animiCtrl.create()
      .addElement(document.getElementById(this.emojis[2]))
      .duration(600)
      .easing('ease-in-out')
      .keyframes([
        {offset: 0, transform: 'scale(0.1)'},
        {offset: 1, transform: 'scale(1.3) translateX(-'+this.trash*2.5+'px) translateY(-'+this.trash*1.5+'px) rotate(-720deg)'}
      ]);

    this.emoD = this.animiCtrl.create()
      .addElement(document.getElementById(this.emojis[3]))
      .duration(600)
      .easing('ease-in-out')
      .keyframes([
        {offset: 0, transform: 'scale(0.1)'},
        {offset: 1, transform: 'scale(1.3) translateX('+this.trash*0.9+'px) translateY(-'+this.trash*3+'px) rotate(360deg)'}
      ]);

    this.deckel = this.animiCtrl.create()
      .addElement(document.getElementById('deckel'))
      .duration(700)
      .easing('ease-in-out')
      .keyframes([
        {offset: 0, transform: 'scale(1)'},
        {offset: 1, transform: ' scale(1.2)', boxShadow: '0px 0px 25px 10px lightgray', border: 'none'}
      ]);

    this.emoAnimation = this.animiCtrl.create()
      //.duration(400)
      .iterations(1)
      .addAnimation([this.emoA, this.emoB, this.emoC, this.emoD, this.deckel]);

    const me = document.getElementsByClassName('kaka') as HTMLCollectionOf<HTMLElement>;

    if (me.length !== 0) {
      me[0].style.left = this.buttonLeft + 'px';
      me[0].style.top = this.buttonTop + 'px';

      const he = document.getElementsByClassName('emojis') as HTMLCollectionOf<HTMLElement>;
      //const eW = Number(he[0].style.width)/2;
      // if (he.length !== 0) {

      for (let i = 0; i < 4; i++) {
        he[i].style.left = Math.floor(this.screenW / 2 - this.trash/2).toString() + 'px';
        he[i].style.top = Math.floor(this.screenH - this.trash*3).toString() + 'px';
        he[i].style.width = this.emojiSize;
       he[i].style.height = this.emojiSize;
      }

    }
    const deckel = document.getElementById('deckel');
    // if (deckel.length !== 0) {

      deckel.style.left = Math.floor(this.screenW / 2 - this.trash/2).toString() + 'px';
      deckel.style.top = Math.floor(this.screenH - this.trash*3).toString() + 'px';
      deckel.style.width = this.trash.toString()+'px';
      deckel.style.height = this.trash.toString()+'px';


 }

ngOnInit() {

  }


emojiShow(){
   if(!this.emoAnimation.isRunning()){
   switch (this.animiBackwards){
     case false: {this.emoAnimation.direction('normal');} break;
     case true: {this.emoAnimation.direction('reverse');} break;
   }
   this.emoAnimation.play().then();this.animiBackwards = !this.animiBackwards;
}
}




muell(){
   alert('ich habe noch nicht fertig');
}


  closeEntry() {

    this.modalController.dismiss();
  }

  checkKey($event: any, myId: string){

if($event.key === 'Enter'){
  $event.preventDefault();
this.readOnlyTitle = true;
this.readOnlyDesc = true;
}
    }

    titleClick(){
    this.readOnlyTitle = false;
    if(this.animiBackwards === true){
      this.emoAnimation.direction('reverse');
      this.animiBackwards = false;
      this.emoAnimation.play();
    }
    }

    descClick(){
    this.readOnlyDesc = false;
      if(this.animiBackwards === true){
        this.emoAnimation.direction('reverse');
        this.animiBackwards = false;
        this.emoAnimation.play();
      }
    }


  /*public setTitle(title: string) {
    this.title = title;
  }

  public setDescription(desc: string) {
    this.description = desc;
  }

  public getTitle() {
    return this.title;
 }

  public getDescription() {
    return this.description;
  }

  deel() {
    document.getElementById('details').style.visibility = 'hidden';
  }*/

}
