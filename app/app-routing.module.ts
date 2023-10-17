import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AutorizadoGuard } from './guards/autorizado.guard';

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
  },
  {
    path: 'register-pasaj',
    loadChildren: () => import('./pages/register-pasaj/register-pasaj.module').then( m => m.RegisterPasajPageModule)
  },
  {
    path: 'newpass',
    loadChildren: () => import('./pages/newpass/newpass.module').then( m => m.NewpassPageModule)
  },
  {
    path: 'viajar',
    loadChildren: () => import('./pages/viajar/viajar.module').then( m => m.ViajarPageModule),
    canActivate:[AutorizadoGuard]
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule),
    canActivate:[AutorizadoGuard]
  },
  {
    path: 'viajarconductor',
    loadChildren: () => import('./pages/viajarconductor/viajarconductor.module').then( m => m.ViajarconductorPageModule),
    canActivate:[AutorizadoGuard]
  },
  {
    path: 'tipouseris',
    loadChildren: () => import('./pages/tipouseris/tipouseris.module').then( m => m.TipouserisPageModule)
  },
  {
    path: 'login2',
    loadChildren: () => import('./pages/login2/login2.module').then( m => m.Login2PageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
