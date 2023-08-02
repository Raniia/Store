import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginComponent } from './account';
import { AdminGuard } from './core/guards/admin.guard';

const routes: Routes = [
    { path: 'account/login', component: LoginComponent },
    { path: '',
    loadChildren: () => import('./product-view/product-view.module').then(m => m.ProductViewModule), canActivate: [AuthGuard] },
    { path: 'product-management',
    loadChildren: () => import('./product-management/product-management.module').then(m => m.ProductManagementModule), canActivate: [AdminGuard] },

    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
