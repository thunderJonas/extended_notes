import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import {EntryEditCardComponent} from '../entry-edit-card/entry-edit-card.component';
import {IfEntryComponent} from '../if-entry/if-entry.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
  ],
  declarations: [HomePage, IfEntryComponent, EntryEditCardComponent]
})
export class HomePageModule {}
