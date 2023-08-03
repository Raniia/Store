import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductManagementService } from '../services/product-management.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {
  
  constructor(
    private actRoute: ActivatedRoute,
    private productManagementService: ProductManagementService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
  }
  form!: FormGroup;
  loading = false;
  submitted = false;
  error?: string;

  ngOnInit() {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
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
    this.productManagementService.addProduct({...this.form.value}).
    pipe(take(1)).subscribe(()=>    this.router.navigate([`/product-management`]));
    
    this.loading = true;
  }

}
