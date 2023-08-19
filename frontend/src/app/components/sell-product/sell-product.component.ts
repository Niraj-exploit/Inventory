import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/Product.service';
import { SaleService } from 'src/app/service/Sale.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-sell-product',
  templateUrl: './sell-product.component.html',
  styleUrls: ['./sell-product.component.css']
})
export class SellProductComponent implements OnInit {
  sales: any;
  productSuggestions: string[] = [];
  customerNameSuggestions: string[] = [];
  
  uniqueCustomerContacts: Set<string> = new Set();
  uniqueCustomerNames: Set<string> = new Set();
  uniqueCustomerEmails: Set<string> = new Set();
  uniqueCustomerAddresses: Set<string> = new Set();
  customerContactSuggestions: string[] = [];
  customerAddressSuggestions: string[] = [];
  customerEmailSuggestions: string[] = [];
  stock: any;

  selectedProductId: string | null = null;
  saleQuantity: number | null = null;
  customerName: string | null = null;
  customerEmail: string | null = null;
  customerContact: string | null = null;
  customerAddress: string | null = null;
  saleData: any = {};
  stockQuantity: any;

  constructor(
    private saleService: SaleService,
    private productService: ProductService,
    private authService:AuthService
  ) {}

  ngOnInit() {
    this.fetchSalesData(); // Renamed from recentSale to fetchSalesData
    this.fetchStock();
  }

  onProductNameInput(event: any): void {
    const inputValue = event.target.value;

    const selectedProduct = this.stock.find(
      (product: any) => product.name === inputValue
    );

    if (selectedProduct) {
      this.selectedProductId = selectedProduct.id;
      this.stockQuantity = selectedProduct.quantity;
    } else {
      this.selectedProductId = null;
      this.stockQuantity = null;
    }
  }
  sellProduct(): void {
    if (
      this.selectedProductId &&
      this.saleQuantity !== null &&
      this.customerName &&
      this.customerEmail &&
      this.customerContact &&
      this.customerAddress
    ) {
      const saleData = {
        quantity: this.saleQuantity,
        bname: this.customerName,
        bemail: this.customerEmail,
        bcontact: this.customerContact,
        baddress: this.customerAddress
      };
  
      this.saleService.saleProduct(this.selectedProductId, saleData).subscribe(
        (response: any) => {
          if (response.success) {
            alert('Product Sold Successfully');
            this.fetchSalesData(); // Fetch recent sales data again
          } else {
            alert('Error');
          }
        },
        (error: any) => {
          console.log(error);
        }
      );
    } else {
      console.log('Please fill in all required fields.');
    }
  }
 
  
  roll(){
    return this.authService.getRoll();
   }

  fetchSalesData(): void {
    this.saleService.latestSale().subscribe(
      (res: any) => {
        if (res.success) {
          this.sales = res.sales;
          this.populateCustomerSuggestions();
        } else {
          console.log('API returned status false or data not found.');
        }
      },
      (error: any) => {
        console.error('Error fetching latest Sale:', error);
      }
    );
  }

  fetchStock(): void {
    this.productService.Stock().subscribe(
      (res: any) => {
        if (res.success) {
          this.stock = res.product;
          this.populateProductSuggestions();
        } else {
          console.log('API returned status false or data not found.');
        }
      },
      (error: any) => {
        console.error('Error fetching stock:', error);
      }
    );
  }

  populateProductSuggestions(): void {
    this.productSuggestions = this.stock.map((product: any) => product.name);
  }

  populateCustomerSuggestions(): void {
    this.customerNameSuggestions = this.sales.map((sale: any) => sale.bname);
    this.customerContactSuggestions = this.sales.map((sale: any) => sale.bcontact);
    this.customerAddressSuggestions = this.sales.map((sale: any) => sale.baddress);
    this.customerEmailSuggestions = this.sales
      .map((sale: any) => sale.bemail)
      .filter((email: any) => email !== null); // Filter out null values

    this.uniqueCustomerNames = new Set(this.customerNameSuggestions);
    this.uniqueCustomerEmails = new Set(this.customerEmailSuggestions);
    this.uniqueCustomerAddresses = new Set(this.customerAddressSuggestions);
     this.uniqueCustomerContacts= new Set(this.customerContactSuggestions);
  }

  reloadWebsite(): void {
    window.location.reload();
  }
}
