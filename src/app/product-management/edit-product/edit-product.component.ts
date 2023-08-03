import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductManagementService } from '../services/product-management.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { pipe, take } from 'rxjs';
import { Product } from '@app/core/models/product';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent {
  productId: string;
  product: Product | undefined;

  constructor(
    private actRoute: ActivatedRoute,
    private productManagementService: ProductManagementService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.productId = this.actRoute.snapshot.params['id'];
  }
  form!: FormGroup;
  loading = false;
  submitted = false;
  error?: string;

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: [this.productId, Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
    });
    this.productManagementService
      .getProductById(this.productId)
      .pipe(take(1))
      .subscribe((product) => {
        this.product=product;
        this.form.setValue({
          id: product.id,
          title: product.title,
          description: product.description,
          price: product.price,
          category:product.category
        });
      });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.error = '';
    if (this.form.invalid) {
      return;
    }
    this.productManagementService.editProduct({...this.product,...this.form.value}).
    pipe(take(1)).subscribe(()=>    this.router.navigate([`/product-management`]));
    
    this.loading = true;
  }
}
