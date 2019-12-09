import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path: 'viaje/:iditem', loadChildren: './pages/viaje/viaje.module#ViajePageModule' },
  { path: 'viaje', loadChildren: './pages/viaje/viaje.module#ViajePageModule' },
  { path: 'tabsviaje/viaje', loadChildren: './pages/viaje/viaje.module#ViajePageModule' },
  { path: 'qr', loadChildren: './pages/qr/qr.module#QrPageModule' },
  { path: 'pages', loadChildren: './pages/tabsviaje/tabsviaje.module#TabsviajePageModule' },
  { path: 'pages/:iditem', loadChildren: './pages/tabsviaje/tabsviaje.module#TabsviajePageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'valoracion', loadChildren: './pages/valoracion/valoracion.module#ValoracionPageModule' },
  { path: 'valoracion/:val', loadChildren: './pages/valoracion/valoracion.module#ValoracionPageModule' },
  { path: 'comentario/:id', loadChildren: './pages/comentario/comentario.module#ComentarioPageModule' },



  //{ path: 'tabsviaje/:id', loadChildren: './tab1/pages/tabsviaje/tabsviaje.module#TabsviajePageModule' }
  


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
