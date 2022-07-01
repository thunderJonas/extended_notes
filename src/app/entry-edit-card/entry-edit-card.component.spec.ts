import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import {EmotionComponent} from '../emotion/emotion.component';
import { EntryEditCardComponent } from './entry-edit-card.component';

describe('EntryEditCardComponent', () => {
  let component: EntryEditCardComponent;
  let fixture: ComponentFixture<EntryEditCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EntryEditCardComponent,EmotionComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EntryEditCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
