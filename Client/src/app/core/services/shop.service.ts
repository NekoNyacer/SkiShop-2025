import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Pagination } from '../types/Pagination';
import { Product } from '../types/Product';
import { ShopParams } from '../types/shopParams';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  baseUrl = 'http://localhost:5000/api/';
  private http = inject(HttpClient);
  types = signal<string[]>([]);
  brands = signal<string[]>([]);
  shopParams = new ShopParams();

  getProducts() {
    const brands = this.shopParams.brands;
    const types = this.shopParams.types;
    const sort = this.shopParams.sort;
    const search = this.shopParams.search;

    let params = new HttpParams();

    if (brands.length > 0) {
      params = params.append('brands', brands.join(','));
    }

    if (types.length > 0) {
      params = params.append('types', types.join(','));
    }

    if (sort) {
      params = params.append('sort', sort);
    }

    if (search) {
      params = params.append('search', search);
    }

    params = params.append('pageSize', this.shopParams.pageSize);
    params = params.append('pageIndex', this.shopParams.pageNumber);

    return this.http.get<Pagination<Product>>(this.baseUrl + 'products', { params });
  }

  getBrands() {
    if (this.brands().length > 0) return;
    return this.http.get<string[]>(this.baseUrl + 'products/brands').subscribe({
      next: (res) => this.brands.set(res),
    });
  }

  getTypes() {
    if (this.types().length > 0) return;
    return this.http.get<string[]>(this.baseUrl + 'products/types').subscribe({
      next: (res) => this.types.set(res),
    });
  }
}
