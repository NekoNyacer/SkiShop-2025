import { Component, inject, OnInit } from '@angular/core';
import { ShopService } from '../../core/services/shop.service';
import { Product } from '../../core/types/Product';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ProductItemComponent } from './product-item/product-item.component';
import { MatDialog } from '@angular/material/dialog';
import { FiltersDialogComponent } from './filters-dialog/filters-dialog.component';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule, MatSelectionListChange } from '@angular/material/list';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Pagination } from '../../core/types/Pagination';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shop',
  imports: [
    MatButtonModule,
    MatCardModule,
    ProductItemComponent,
    MatButton,
    MatIcon,
    MatMenuModule,
    MatListModule,
    MatPaginatorModule,
    FormsModule
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
})
export class ShopComponent implements OnInit {
  protected shopService = inject(ShopService);
  private dialogService = inject(MatDialog);
  products?: Pagination<Product>;
  pageSizeOptions = [5, 10, 15, 20];

  protected sortOptions = [
    { name: '按照名稱', value: 'name' },
    { name: '按照價格:高到低', value: 'priceDesc' },
    { name: '按照價格:低到高', value: 'priceAsc' },
  ];

  ngOnInit(): void {
    this.initializeShop();
  }

  initializeShop() {
    this.shopService.getBrands();
    this.shopService.getTypes();
    this.getProducts();
  }

  handlePageEvent(event: PageEvent) {
    this.shopService.shopParams.pageNumber = event.pageIndex + 1;
    this.shopService.shopParams.pageSize = event.pageSize;
    this.getProducts();
  }

  onSearchChange() {
    this.shopService.shopParams.pageNumber = 1;
    this.getProducts();
  }

  getProducts() {
    this.shopService.getProducts().subscribe({
      next: (res) => {
        this.products = res;
      },
      error: (error) => console.log(error),
    });
  }

  onSortChange(event: MatSelectionListChange) {
    const selectedOption = event.options[0];
    if (selectedOption) {
      this.shopService.shopParams.sort = selectedOption.value;
      this.shopService.shopParams.pageNumber = 1;
      this.getProducts();
    }
  }

  openFilterDiaglog() {
    const dialogRef = this.dialogService.open(FiltersDialogComponent, {
      minWidth: '500px',
      data: {
        selectedBrands: this.shopService.shopParams.brands,
        selectedTypes: this.shopService.shopParams.types,
      },
    });

    dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (result) {
          this.shopService.shopParams.brands = result.selectedBrands;
          this.shopService.shopParams.types = result.selectedTypes;
          this.shopService.shopParams.pageNumber = 1;
          this.getProducts();
        }
      },
    });
  }
}
