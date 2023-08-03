import { Component } from '@angular/core';
import { ProductViewService } from './services/product-view.service';
import { Subject, switchMap } from 'rxjs';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent {
  constructor(
    private productViewService: ProductViewService
    ) {
    }
    public getAllCategories = this.productViewService.getAllCategories();
    public categoryChange = new Subject<string>();
    public getAllProductsByCategory = this.categoryChange.pipe(switchMap((category) => this.productViewService.getProductsByCategory(category)));

  gridColumns = 4;
  onClickCategory (category: string) {
    this.categoryChange.next(category);
  }

}
