import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Product } from '@app/core/models/product';
import { environment } from '@environments/environment';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductManagementService {
public allProducts = new Subject<Product[]>();
    constructor(
        private http: HttpClient
    ) {
    }
    getAllProducts() {
        return this.http.get<Product[]>(`${environment.fakeStoreAPI}/products`)
            .pipe(tap(products => {
              this.allProducts.next(products);
            })).subscribe();
    }
    deleteProduct(productId: string) {

      return this.http.delete<Product[]>(`${environment.fakeStoreAPI}/products/${productId}`).pipe(tap(async () => {
        const products = await this.allProducts.toPromise();
        let index: number = (products || []).findIndex((product:Product) => product.id === productId);

        (products || []).splice(index,1)
        this.allProducts.next(products || []);
      }));
  }
}
