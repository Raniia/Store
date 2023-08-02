import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductManagementComponent } from './product-management.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { AddProductComponent } from './add-product/add-product.component';

const routes: Routes = [
    {
        path: '',
        component: ProductManagementComponent,
        canActivate:[]
    },
    { path: 'edit/:id', component: EditProductComponent },
    { path: 'add/', component: AddProductComponent },
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductManagementRoutingModule { }
