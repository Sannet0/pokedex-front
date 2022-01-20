import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPageComponent } from './list-page/list-page.component';
import { ItemPageComponent } from './list-page/item-page/item-page.component';
import { SceletonItemPageComponent } from './list-page/item-page/sceleton-item-page/sceleton-item-page.component';
import { LoadedItemPageComponent } from './list-page/item-page/loaded-item-page/loaded-item-page.component';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { NotfoundPageComponent } from './notfound-page/notfound-page.component';
import { FileManagePageComponent } from './file-manage-page/file-manage-page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'pokemons'
  },
  {
    path: 'pokemons',
    pathMatch: 'full',
    component: ListPageComponent,
    children: [
      { path: '', component: ItemPageComponent, children: [{ path: '', component: LoadedItemPageComponent }, { path: '', component: SceletonItemPageComponent }] }
    ]
  },
  {
    path: 'favorites',
    pathMatch: 'full',
    component: ListPageComponent,
    children: [
      { path: '', component: ItemPageComponent, children: [{ path: '', component: LoadedItemPageComponent }, { path: '', component: SceletonItemPageComponent }] }
    ]
  },
  {
    path: 'auth',
    component: AuthPageComponent
  },
  {
    path: 'files',
    component: FileManagePageComponent
  },
  {
    path: '**',
    component: NotfoundPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }


