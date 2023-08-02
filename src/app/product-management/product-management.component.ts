import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductManagementService } from './services/product-management.service';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from '@app/core/models/product';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.scss'],
})
export class ProductManagementComponent implements OnInit {

  constructor(
    private productManagementService: ProductManagementService,
    private router: Router
    ) {
      this.productManagementService.getAllProducts();
    }
    public getAllProducts = this.productManagementService.allProducts;
    @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
    dataSource: any = [];
  ngOnInit(): void {
    this.getAllProducts.subscribe((products) => {
      this.dataSource = new MatTableDataSource<Product>(products);
      this.dataSource.paginator = this.paginator;
    })
  }
  edit(id: string){
this.router.navigate([`/product-management/edit/${id}`]);
}
delete(id: string) {
  this.productManagementService.deleteProduct(id).subscribe(()=> {
  });

}
  displayedColumns: string[] = ['id', 'title', 'price', 'category', 'description', 'edit', 'delete'];
}

