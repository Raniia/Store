import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, take, tap } from 'rxjs/operators';
import { Product } from '@app/core/models/product';
import { environment } from '@environments/environment';
import { ReplaySubject, combineLatest } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductManagementService {
  public allProducts = new ReplaySubject<Product[]>();
  constructor(private http: HttpClient) {
    this.getAllProducts();
  }
  getAllProducts() {
    return this.http
      .get<Product[]>(`${environment.fakeStoreAPI}/products`)
      .pipe(
        tap((products) => {
          this.allProducts.next(products);
        })
      )
      .subscribe();
  }
  deleteProduct(productId: string) {
    return combineLatest([
      this.allProducts.pipe(take(1)),
      this.http.delete<Product[]>(
        `${environment.fakeStoreAPI}/products/${productId}`
      ),
    ]).pipe(
      tap(([products]) => {
        let index: number = products.findIndex(
          (product: Product) => product.id === productId
        );
        products.splice(index, 1);
        this.allProducts.next(products);
      })
    );
  }
  getProductById(productId: string) {
    return this.http
      .get<Product>(`${environment.fakeStoreAPI}/products/${productId}`)
      .pipe(
        map((product) => {
          return product
        })
      )
  }
  editProduct(product: Product) {
    return combineLatest([
      this.allProducts.pipe(take(1)),
      this.http.put<Product>(
        `${environment.fakeStoreAPI}/products/${product.id}`,
        product
      ),
    ]).pipe(
      tap(([products]) => {
        let index: number = products.findIndex(
          (product: Product) => product.id === product.id
        );
        products[index]= {...products[index],...product}
        this.allProducts.next(products);
      })
    );
  }
  addProduct(product: Product) {
    return combineLatest([
      this.allProducts.pipe(take(1)),
      this.http.post<Product>(
        `${environment.fakeStoreAPI}/products`,
        product
      ),
    ]).pipe(
      tap(([products,productRes]) => {
        products.push(productRes);
        this.allProducts.next(products);
      })
    );
  }
}
