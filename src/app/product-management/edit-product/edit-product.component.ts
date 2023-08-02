import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent {
  product_id: string;
  constructor(private actRoute: ActivatedRoute) {
    this.product_id = this.actRoute.snapshot.params['id'];
  }
}
