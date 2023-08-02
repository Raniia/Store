import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from "@angular/flex-layout";
import {MatTableModule} from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
 imports:      [
     CommonModule,
     TranslateModule.forChild({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    }),
      HttpClientModule,
      FormsModule,
      MatFormFieldModule,
      MatInputModule,
      MatCardModule,
      FlexLayoutModule,
      MatTableModule,
      MatPaginatorModule,
      MatIconModule
    ],
 declarations: [ ],
 exports:      [
     CommonModule,
     FormsModule,
     TranslateModule,
     MatFormFieldModule,
     MatInputModule,
     MatCardModule,
     FlexLayoutModule,
     MatTableModule,
     MatPaginatorModule,
     MatIconModule
    ]
})

export class SharedModule { }

/** required for AOT compilation (for translation) */
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
  }
