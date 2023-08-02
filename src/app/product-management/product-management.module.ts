import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductManagementComponent } from './product-management.component';
import { SharedModule } from '@app/shared/shared.module';
import { ProductManagementRoutingModule } from './product-management-routing.module';
import { EditProductComponent } from './edit-product/edit-product.component';
import { AddProductComponent } from './add-product/add-product.component';



@NgModule({
  declarations: [ProductManagementComponent, EditProductComponent, AddProductComponent],
  imports: [
    CommonModule,
    SharedModule,
    ProductManagementRoutingModule,

  ]
})
export class ProductManagementModule { }
