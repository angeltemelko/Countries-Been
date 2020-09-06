import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ListOfCapitalsPage } from './list-of-capitals.page';

const routes: Routes = [
  {
    path: '',
    component: ListOfCapitalsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ListOfCapitalsPage]
})
export class ListOfCapitalsPageModule {}
