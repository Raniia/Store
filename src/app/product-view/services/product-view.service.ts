import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Product } from '@app/core/models/product';
import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class ProductViewService {

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
    getAllCategories() {
      return this.http.get<string[]>(`${environment.fakeStoreAPI}/products/categories`)
          .pipe(map(categories => {
              return categories;
          }));
  }
  getProductsByCategory(id: string) {
    return this.http.get<Product[]>(`${environment.fakeStoreAPI}/products/category/${id}`)
        .pipe(map(products => {
            return products;
        }));
}
}
