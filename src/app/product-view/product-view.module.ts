import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ProductViewRoutingModule } from './product-view-routing.module';
import { ProductViewComponent } from './product-view.component';
import { ProductListComponent } from './product-list/product-list.component';

@NgModule({
  declarations: [ProductViewComponent, ProductListComponent],
  imports: [
    CommonModule,
    SharedModule,
    ProductViewRoutingModule,
  ]
})
export class ProductViewModule { }
