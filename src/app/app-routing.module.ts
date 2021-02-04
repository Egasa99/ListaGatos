import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tab-bar/tab-bar.module').then(m => m.TabBarPageModule)
  },
  /*{
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  },*/
  {
    path: 'gato-detalle/:id',
    loadChildren: () => import('./gato-detalle/gato-detalle.module').then( m => m.GatoDetallePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
