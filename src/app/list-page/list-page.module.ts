import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

import { ListPageComponent } from './list-page.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ItemPageModule } from './item-page/item-page.module';
import { MatRippleModule } from '@angular/material/core';
import { AngularToastifyModule, ToastService } from 'angular-toastify';

@NgModule({
  declarations: [
    ListPageComponent
  ],
  exports: [
    ListPageComponent
  ],
  imports: [
    CommonModule,
    ItemPageModule,
    MatPaginatorModule,
    MatDividerModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatIconModule,
    MatRippleModule,
    AngularToastifyModule
  ],
  providers: [
    ToastService
  ]
})
export class ListPageModule { }
