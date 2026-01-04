import { Component, input } from '@angular/core';
import { Product } from '../../../core/types/Product';
import { MatCard, MatCardActions, MatCardContent } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-product-item',
  imports: [MatCard, MatCardContent, MatCardActions, MatButton, MatIcon, CommonModule],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss',
})
export class ProductItemComponent {
  product = input.required<Product>();
}
