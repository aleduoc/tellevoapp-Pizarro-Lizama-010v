import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'tipo-user',
    loadChildren: () => import('./pages/tipo-user/tipo-user.module').then( m => m.TipoUserPageModule)
  },
  {
    path: 'register-cond',
    loadChildren: () => import('./pages/register-cond/register-cond.module').then( m => m.RegisterCondPageModule)
  },
  {
    path: 'informacion',
    loadChildren: () => import('./pages/informacion/informacion.module').then( m => m.InformacionPageModule)
  },  {
    path: 'register-pasaj',
    loadChildren: () => import('./pages/register-pasaj/register-pasaj.module').then( m => m.RegisterPasajPageModule)
  },
  {
    path: 'newpass',
    loadChildren: () => import('./pages/newpass/newpass.module').then( m => m.NewpassPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
