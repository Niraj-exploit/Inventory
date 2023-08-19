import { Component, OnInit,ViewEncapsulation  } from '@angular/core';
import { ProductService } from 'src/app/service/Product.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css'],
  encapsulation: ViewEncapsulation.None // Set encapsulation to none
})
export class StockComponent implements OnInit {
  stock: any = [];
  searchTerm: string = '';
  filteredStock: any[] = [];

  constructor(private Product: ProductService, private authService:AuthService) { }  

  ngOnInit() {
    this.Stock(); 
  }

  Stock(): void {
    this.Product.Stock().subscribe(
      (res: any) => {
        if (res.success) {
          this.stock = res.product;
          this.updateFilteredStock();
        } else {
          console.log('API returned status false or data not found.');
        }
      },
      (error: any) => {
        console.error('Error fetching stock:', error);
      }
    );
  }

  filterStock(event: any): void {
    const term = event.target.value; // Extract the value from the event
    this.searchTerm = term;
    this.updateFilteredStock();
  }

  updateFilteredStock(): void {
    this.filteredStock = this.stock.filter((stockItem: any) =>
      stockItem.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  reloadWebsite(): void {  
    window.location.reload();
  }
  roll(){
    return this.authService.getRoll();
   }
}
