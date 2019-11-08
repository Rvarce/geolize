import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsviajePageRoutingModule } from './tabsviaje.router.module';

import { TabsviajePage } from './tabsviaje.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsviajePageRoutingModule
  ],
  declarations: [TabsviajePage]
})
export class TabsviajePageModule {}
