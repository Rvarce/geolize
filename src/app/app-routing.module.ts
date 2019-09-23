import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path: 'viaje/:id', loadChildren: './tab1/pages/viaje/viaje.module#ViajePageModule' },
  { path: 'tabsviaje/viaje', loadChildren: './tab1/pages/viaje/viaje.module#ViajePageModule' },
  { path: 'qr', loadChildren: './tab1/pages/qr/qr.module#QrPageModule' },
  { path: 'pages', loadChildren: './tab1/pages/tabsviaje/tabsviaje.module#TabsviajePageModule' },  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },

  //{ path: 'tabsviaje/:id', loadChildren: './tab1/pages/tabsviaje/tabsviaje.module#TabsviajePageModule' }
  


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
