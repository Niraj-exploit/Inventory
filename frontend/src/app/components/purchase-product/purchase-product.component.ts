import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/Product.service';
import { AuthService } from 'src/app/service/auth.service';
import { CategoryService } from 'src/app/service/Category.service';

@Component({
  selector: 'app-purchase-product',
  templateUrl: './purchase-product.component.html',
  styleUrls: ['./purchase-product.component.css'],
})
export class PurchaseProductComponent implements OnInit {
  addedProduct: any = {};
  quantityEntered: boolean = false;
  recentPurchase: any[] = [];
  categories: any[] = [];
  uniqueCategoryCodes: string[] = [];
  uniqueVendors: Set<string> = new Set();
  uniqueVendorNames: Set<string> = new Set();
  uniqueVendorEmails: Set<string> = new Set();
  uniqueVendorContacts: Set<string> = new Set();

  constructor(
    private authService: AuthService,
    private product: ProductService,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.recentProduct();
    this.categoryList();
    this.fetchCategories();
  }

  fetchCategories() {
    this.product.getAllCategories().subscribe(
      (response) => {
        if (response.success) {
          this.categories = response.categories;
        }
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  reloadWebsite(): void {
    window.location.reload();
  }

  recentProduct(): void {
    this.product.recent().subscribe(
      (res: any) => {
        if (res.success) {
          this.recentPurchase = res.purchase;

          // Extract unique vendor info from recentPurchase
          this.uniqueVendors = new Set<string>();
          this.recentPurchase.forEach((item) => {
            const vendorInfo = `${item.sname} (${item.semail}) - ${item.scontact}`;
            this.uniqueVendors.add(vendorInfo);
          });

          // Extract unique vendor names, emails, and contacts
          const uniqueVendorNames = new Set<string>();
          const uniqueVendorEmails = new Set<string>();
          const uniqueVendorContacts = new Set<string>();

          this.recentPurchase.forEach((item) => {
            this.uniqueVendorNames.add(item.sname);
            this.uniqueVendorEmails.add(item.semail);
            this.uniqueVendorContacts.add(item.scontact);
          });
        } else {
          console.log('API returned status false or data not found.');
        }
      },
      (error: any) => {
        console.error('Error fetching stock:', error);
      }
    );
  }
  selectedCategoryCode: any = {}; 
  onCategorySelect() {
    // Find the category based on the selected category code
    const selectedCategory = this.categories.find(
      (category) => category.code === this.selectedCategoryCode
    );

    if (selectedCategory) {
      this.addedProduct.selectedCategory = selectedCategory.name;
    }
  }

  categoryList(): void {
    this.categoryService.categroyList().subscribe(
      (res: any) => {
        if (res.success) {
          this.categories = res.categories;
  
        // Apply the filter only if quantity has been entered
        if (this.quantityEntered) {
          this.categories = this.categories.filter(category => +category.volume >= this.addedProduct.quantity);
        }
      } else {
        console.log('API returned status false or data not found.');
      }
    },
    (error: any) => {
      console.error('Error fetching stock:', error);
    }
    );
  }
  

  newProduct(): void {
    debugger
    this.addedProduct.categoryCode = this.selectedCategoryCode.code;
    this.product.productCreate(this.addedProduct).subscribe(
      (res: any) => {
        console.log(this.addedProduct);
        if (res.success) {
          alert('New Product added Successfully');
          this.recentProduct();
        } else {
          console.log('Cannot Add Product');
        }
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  roll() {
    return this.authService.getRoll();
  }
}
