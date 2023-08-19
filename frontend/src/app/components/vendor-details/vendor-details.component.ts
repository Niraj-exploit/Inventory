import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/Product.service';

@Component({
  selector: 'app-vendor-details',
  templateUrl: './vendor-details.component.html',
  styleUrls: ['./vendor-details.component.css']
})
export class VendorDetailsComponent implements OnInit {
  uniqueVendors: any[] = [];
  filteredVendors: any[] = [];
  stockProducts: any[] = [];
  searchTerm: string = '';

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.Stock();
  }

  Stock(): void {
    this.productService.Stock().subscribe(
      (res: any) => {
        if (res.success) {
          this.stockProducts = res.product;
          this.getUniqueVendor(this.stockProducts);
        } else {
          console.log('API returned status false or data not found.');
        }
      },
      (error: any) => {
        console.error('Error fetching stock:', error);
      }
    );
  }

  getUniqueVendor(stockProducts: any[]): void {
    const uniqueVendorMap = new Map<string, any>();

    stockProducts.forEach((product: any) => {
      const vendorKey = `${product.sname}-${product.semail}-${product.scontact}`;
      if (!uniqueVendorMap.has(vendorKey)) {
        uniqueVendorMap.set(vendorKey, {
          sname: product.sname,
          semail: product.semail,
          scontact: product.scontact,
          saddress: product.saddress
        });
      }
    });

    this.uniqueVendors = Array.from(uniqueVendorMap.values());
    this.filteredVendors = [...this.uniqueVendors]; // Initialize filteredVendors with all vendors
  }

  applyFilter(): void {
    this.filteredVendors = this.uniqueVendors.filter(vendor =>
      vendor.sname.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      vendor.semail.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      vendor.scontact.includes(this.searchTerm)
    );
  }

  reloadWebsite(): void {  
    window.location.reload();
  }
}
