import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Product } from '@app/core/models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnChanges {
  @Input() products: Product[] =  [];
  gridColumns = 3;
  ngOnChanges(): void {
console.log(this.products);
  }

}
