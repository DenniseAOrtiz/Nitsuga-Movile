import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ResetPasswordComponent } from './login/reset-password/reset-password.component';
import { RegisterComponent } from './login/register/register.component';
import { AdminGuard } from './guards/admin.guard'; // Asegúrate de importar el guard
import { AdminPage } from './admin/admin.page';
import { AdminCatPage } from './admin-cat/admin-cat.page';
import { AdminProdPage } from './admin-prod/admin-prod.page';
import { AdminUsersPage } from './admin-users/admin-users.page';
import { AdminPedidosPage } from './admin-pedidos/admin-pedidos.page';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  { path: 'admin', 
    component: AdminPage, 
    canActivate: [AdminGuard] 
  },
  { path: 'admin-cat', 
    component: AdminCatPage, 
    canActivate: [AdminGuard] 
  },
  { path: 'admin-prod', 
    component: AdminProdPage, 
    canActivate: [AdminGuard] 
  },
  { path: 'admin-users', 
    component: AdminUsersPage, 
    canActivate: [AdminGuard] 
  },
  { path: 'admin-pedidos', 
    component: AdminPedidosPage, 
    canActivate: [AdminGuard] 
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'client-profile',
    loadChildren: () => import('./login/profiles/client-profile/client-profile.module').then(m => m.ClientProfilePageModule)
  },
  {
    path: 'admin-profile',
    loadChildren: () => import('./login/profiles/admin-profile/admin-profile.module').then(m => m.AdminProfilePageModule)
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'categorias',
    loadChildren: () => import('./categorias/categorias.module').then( m => m.CategoriasPageModule)
  },
  {
    path: 'productos/:id',
    loadChildren: () => import('./productos/productos.module').then( m => m.ProductosPageModule)
  },
  {
    path: 'cliente',
    loadChildren: () => import('./cliente/cliente.module').then( m => m.ClientePageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then( m => m.AdminPageModule)
  },
  {
    path: 'admin-prod/:id',
    loadChildren: () => import('./admin-prod/admin-prod.module').then( m => m.AdminProdPageModule)
  },
  {
    path: 'carrito',
    loadChildren: () => import('./carrito/carrito.module').then( m => m.CarritoPageModule)
  },
  {
    path: 'admin-pedidos',
    loadChildren: () => import('./admin-pedidos/admin-pedidos.module').then( m => m.AdminPedidosPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule],
  declarations: [],
})
export class AppRoutingModule {}
