import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadedItemPageComponent } from './loaded-item-page/loaded-item-page.component';
import { SceletonItemPageComponent } from './sceleton-item-page/sceleton-item-page.component';
import { ItemPageComponent } from './item-page.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [
    ItemPageComponent,
    LoadedItemPageComponent,
    SceletonItemPageComponent
  ],
  exports: [
    ItemPageComponent
  ],
  imports: [
    CommonModule,
    MatExpansionModule,
    MatListModule
  ]
})
export class ItemPageModule { }
