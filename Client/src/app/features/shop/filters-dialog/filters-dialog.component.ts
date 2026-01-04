import { Component, inject, model } from '@angular/core';
import { ShopService } from '../../../core/services/shop.service';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-filters-dialog',
  imports: [
    MatDividerModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatListModule,
    FormsModule,
  ],
  templateUrl: './filters-dialog.component.html',
  styleUrl: './filters-dialog.component.scss',
})
export class FiltersDialogComponent {
  protected shopService = inject(ShopService);
  private dialogRef = inject(MatDialogRef<FiltersDialogComponent>);
  data = inject(MAT_DIALOG_DATA);

  applyFilters() {
    this.dialogRef.close({
      selectedBrands: this.shopService.shopParams.brands,
      selectedTypes: this.shopService.shopParams.types,
    });
  }
}
