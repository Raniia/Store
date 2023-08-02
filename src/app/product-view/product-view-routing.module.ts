import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductViewComponent } from './product-view.component';

const routes: Routes = [
    {
        path: '',
        component: ProductViewComponent,
        canActivate:[]
    }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductViewRoutingModule { }
