import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsviajePage } from './tabsviaje.page';


const routes: Routes = [
  {
    path: 'tabsviaje',
    component: TabsviajePage,
    children: [
      {
        path: 'viaje',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../viaje/viaje.module').then(m => m.ViajePageModule)
          }
        ]
      },
      {
        path: 'qr',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../qr/qr.module').then(m => m.QrPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: 'tabsviaje/viaje',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'tabsviaje/viaje',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsviajePageRoutingModule {}
