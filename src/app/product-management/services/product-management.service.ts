import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Product } from '@app/core/models/product';
import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class ProductManagementService {

    constructor(
        private http: HttpClient
    ) {
    }
    getAllProducts() {
        return this.http.get<Product[]>(`${environment.fakeStoreAPI}/products`)
            .pipe(map(products => {
                return products;
            }));
    }
    deleteProduct(productId: string) {
      return this.http.delete<Product[]>(`${environment.fakeStoreAPI}/products/${productId}`);
  }
}
