import {AfterViewInit, Component, OnInit, Input} from '@angular/core';
import {Animation, AnimationController} from '@ionic/angular';
import {EntryEditCardComponent} from '../entry-edit-card/entry-edit-card.component';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '.app-emotion',
  templateUrl: './emotion.component.html',
  styleUrls: ['./emotion.component.scss'],
})
export class EmotionComponent implements OnInit, AfterViewInit{
  @Input() emotion: number;
  @Input() emotionWeight: number;
  screenW: number;
  screenH: number;
  emojiSize: number;
  emoA: Animation;
  emoB: Animation;
  emoC: Animation;
  emoD: Animation;
  emoHood: Animation;
  emotionSet = false;
  bar: Animation;
  barWidth: number;
  barHeight: number;
  barBegin: number;
  barEnd: number;
  barVal: Animation;
  rollback: Animation;
  barStart: Animation;
  emoAnimation: Animation;
  animiBackwards = false;
  emojis: string[][] = [['./assets/emojis/happy.svg', 'happy','#00aaff'], ['./assets/emojis/fear.svg','fear', '#e9ce00'],
    ['./assets/emojis/sad.svg', 'sad', '#55aa7f'],[ './assets/emojis/angry.svg','angry', '#ff0012']];
  emoHoodSrc = './assets/emojis/feeling.svg';
  constructor(private animiCtrl: AnimationController) {

  }

  ngOnInit() {
    this.screenW = window.innerWidth;
    this.screenH = window.innerHeight;
    this.emojiSize = this.screenW / 8;
    this.barWidth = this.screenW*0.9 - this.emojiSize;
    this.barBegin = (this.screenW - this.barWidth)/2;
    this.barEnd = this.screenW - this.barBegin;
    this.barHeight = this.emojiSize/6;
  }
  ngAfterViewInit() {
    //Emoji Position und Größe übergeben
    this.setEmojiPositionSize();
    this.setBar();
    //Animationen generieren
    this.createAnimations();
  }
  centerX(position: number, objectWidth: number){
    return position - objectWidth / 2;
  }
  //Y-Position zentriert zurückgeben
  centerY(position: number, objectHeight: number){
    return position - objectHeight / 2;
  }
  //alle Emojis ausblenden
  hideEmojis(){
    for(const index of this.emojis){
      document.getElementById(this.emojis[this.emojis.indexOf(index)][1]).style.visibility = 'hidden';
    }
  }
  //alle Emojis einblenden
  unhideEmojis(){
    for(const index of this.emojis){
      document.getElementById(this.emojis[this.emojis.indexOf(index)][0]).style.visibility = 'visible';
    }
  }
  //Bar
  setBar(){
    document.getElementById('bar').style.top = this.pixValue((this.screenH - this.emojiSize * 3)+this.emojiSize/2);
    document.getElementById('barVal').style.top = this.pixValue((this.screenH - this.emojiSize * 3)+this.emojiSize/2);

  }


  //Emojis Position und Größen übergeben
  setEmojiPositionSize()
  {
      //Emotion Emojis Position und Größe übergeben
      const he = document.getElementsByClassName('emojis') as HTMLCollectionOf<HTMLElement>;
      for (let i = 0; i < 4; i++) {
        he[i].style.left = this.pixValue(this.screenW / 2 - this.emojiSize / 2);
        he[i].style.top = this.pixValue(this.screenH - this.emojiSize * 3);
        he[i].style.width = this.pixValue(this.emojiSize);
        he[i].style.height = this.pixValue(this.emojiSize);
      }
    //EmoHood Position und Größe übergeben
    const emoHood = document.getElementById('emoHood');
    emoHood.style.left = this.pixValue(this.screenW / 2 - this.emojiSize / 2);
    const emoHoodTop = this.screenH - this.emojiSize * 3;
    emoHood.style.top = this.pixValue(emoHoodTop);
    emoHood.style.width = this.pixValue(this.emojiSize);
    emoHood.style.height = this.pixValue(this.emojiSize);

    //bar Positionieren und Ausrichten
    const myBar = document.getElementById('bar').style;
    myBar.left = this.pixValue(this.barBegin);
    myBar.height = this.pixValue(this.barHeight);
    myBar.width = this.pixValue(this.barWidth);
    const myBarVal = document.getElementById('barVal').style;
    myBarVal.left = this.pixValue(this.barBegin);
    myBarVal.height = this.pixValue(this.barHeight);
    myBarVal.width = this.pixValue(this.barWidth);


  }

  //Emojis auf- und zuklappen
  emojiShow() {
    if(this.emotionSet === false) {
      if (!this.emoAnimation.isRunning()) {
        switch (this.animiBackwards) {
          case false: {
            this.emoAnimation.direction('normal');
          }
            break;
          case true: {
            this.emoAnimation.direction('reverse');
          }
            break;
        }
        this.emoAnimation.play().then();
        this.animiBackwards = !this.animiBackwards;
      }
    }
  }
  //Auswahl der Emotion
  setEmotion(no: number){
    this.emotion = no;
    EntryEditCardComponent.prototype.emotion = no;
    this.emoAnimation.direction('reverse');
    this.animiBackwards = false;
    this.emoAnimation.play().then(() => this.hideEmojis()).then(()=> this.emoHoodSrc = this.emojis[no][0]).then(()=> this.barStart.play());
    this.emotionSet = true;
  }
  //Emotionsskala bedienen
  setEmotionWeight(event){
    if(this.emotionSet === true && !this.barStart.isRunning() && !this.emoAnimation.isRunning()){
      this.barStart.stop();
      this.emoAnimation.stop();
      document.getElementById('bar').style.opacity = '100%';
      const barV = document.getElementById('barVal').style;
      barV.opacity = '100%';
      const emojiMin = this.barBegin-this.emojiSize/2;
      const emojiMax = this.barEnd-this.emojiSize/2;
      const emojiX = this.constrain(event.touches[0].clientX - this.emojiSize/2, emojiMin, emojiMax);
      document.getElementById('emoHood').style.left = this.pixValue(emojiX);
      const myBarVal = document.getElementById('barVal').style;
      myBarVal.width = this.pixValue(emojiX/(this.barWidth)*this.barWidth);
      myBarVal.backgroundColor = this.emojis[this.emotion][2];
      const percent = Math.floor(this.map(emojiX, emojiMin, emojiMax, 0,100));
      this.emotionWeight = percent;
      EntryEditCardComponent.prototype.emotionWeight = percent;
    }
  }

  map(value: number, min: number, max: number, newMin: number, newMax: number) {
    let val = (value - min) * (newMax - newMin) / (max - min) + newMin;
    if (val < newMin){val = newMin;}
    else if (val > newMax){ val = newMax;}
    return val;
  }

   constrain(num: number, min: number, max: number){
    return Math.min(Math.max(num, min), max);
  }

  //Erstellen der Animationen
  createAnimations() {
    this.emoA = this.animiCtrl.create()
      .addElement(document.getElementById(this.emojis[0][1]))
      .duration(600)
      .easing('ease-in-out')
      .keyframes([
        {offset: 0, transform: 'scale(0.1) rotate(0deg)'},
        {
          offset: 1,
          transform: 'scale(1.3) translateX(-' + this.pixValue(this.emojiSize * 0.9) + ') ' +
            'translateY(-' + this.pixValue(this.emojiSize * 3) + ') rotate(-360deg)',
          filter: 'drop-shadow(0px 5px 2px rgb(0 0 0 / 0.4))'
        }
      ]);

    this.emoB = this.animiCtrl.create()
      .addElement(document.getElementById(this.emojis[1][1]))
      .duration(600)
      .easing('ease-in-out')
      .keyframes([
        {offset: 0, transform: 'scale(0.1) rotate(0deg)'},
        {
          offset: 1, transform: 'scale(1.3) translateX(' + this.pixValue(this.emojiSize * 2.5) + ') ' +
            'translateY(-' + this.pixValue(this.emojiSize * 1.5) + ') rotate(720deg)',
          filter: 'drop-shadow(-3px 5px 2px rgb(0 0 0 / 0.4))'
        }
      ]);

    this.emoC = this.animiCtrl.create()
      .addElement(document.getElementById(this.emojis[2][1]))
      .duration(600)
      .easing('ease-in-out')
      .keyframes([
        {offset: 0, transform: 'scale(0.1) rotate(0deg)'},
        {
          offset: 1,
          transform: 'scale(1.3) translateX(-' + this.pixValue(this.emojiSize * 2.5) + ') ' +
            'translateY(-' + this.pixValue(this.emojiSize * 1.5) + ') rotate(-720deg)',
          filter: 'drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4))'
        }
      ]);

    this.emoD = this.animiCtrl.create()
      .addElement(document.getElementById(this.emojis[3][1]))
      .duration(600)
      .easing('ease-in-out')
      .keyframes([
        {offset: 0, transform: 'scale(0.1) rotate(0deg)'},
        {
          offset: 1,
          transform: 'scale(1.3) translateX(' + this.pixValue(this.emojiSize * 0.9) + ') ' +
            'translateY(-' + this.pixValue(this.emojiSize * 3) + ') rotate(720deg)',
          filter: 'drop-shadow(0px 5px 2px rgb(0 0 0 / 0.4))'
        }
      ]);

    this.emoHood = this.animiCtrl.create()
      .addElement(document.getElementById('emoHood'))
      .duration(700)
      .easing('ease-in-out')
      .keyframes([
        {offset: 0, transform: 'scale(1)'},
        {offset: 1, transform: ' scale(1.2)', filter: 'drop-shadow(0px 0px 10px rgb(0 0 0 / 0.5))'}
      ]);

    this.bar = this.animiCtrl.create()
      .addElement(document.getElementById('bar'))
      .easing('ease-in-out')
      .keyframes([
        {offset: 0, opacity: '0%'},
        {offset: 1, opacity: '100%'}
      ]);

    this.barVal = this.animiCtrl.create()
      .addElement(document.getElementById('barVal'))
      .easing('ease-in-out')
      .keyframes([
        {offset: 0, opacity: '0%', width: this.pixValue(this.screenW / 2)},
        {offset: 1, opacity: '100%', width: '0px'}
      ]);

    this.rollback = this.animiCtrl.create()
      .addElement(document.getElementById('emoHood'))
      .easing('ease-in-out')
      .duration(300)
      .keyframes([
        {offset: 0, left: this.pixValue(this.screenW / 2 - this.emojiSize / 2), transform: 'rotate(0)'},
        {offset: 1, left: this.pixValue(this.barBegin - this.emojiSize / 2), transform: 'rotate(-360deg)'}
      ]);
    //Bar Anzeige Animation
    this.barStart = this.animiCtrl.create()
      .iterations(1)
      .addAnimation([this.bar, this.barVal, this.rollback]);

    //Emoji Animationen Gruppieren
    this.emoAnimation = this.animiCtrl.create()
      .iterations(1)
      .addAnimation([this.emoA, this.emoB, this.emoC, this.emoD, this.emoHood]);
  }
  //Rückgabewert als String mit "px"
  private pixValue(value: number) {
    return Math.floor(value).toString() + 'px';
  }
}


