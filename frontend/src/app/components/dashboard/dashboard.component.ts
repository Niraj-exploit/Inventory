import { Component, OnInit } from '@angular/core';
import { SaleService } from 'src/app/service/Sale.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  sales: any[] = [];
  totalSale: number = 0;
  revenue: number = 0;
  totalCustomerCount: number = 0; // Initialize the customer count

  constructor(private saleService: SaleService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData(): void {
    this.topSelling();
    this.saleCount();
    this.totalRevenue();
    this.countTotalCustomers();
  }

  topSelling(): void {
    this.saleService.highestSelling().subscribe(
      (res: any) => {
        if (res.success) {
          this.sales = res.sales;
          this.countTotalCustomers();
        } else {
          console.log('API returned status false or data not found.');
        }
      },
      (error: any) => {
        console.error('Error fetching latest Sale:', error);
      }
    );
  }

  saleCount(): void {
    this.saleService.saleCount().subscribe(
      (res: any) => {
        if (res.success) {
          this.totalSale = res.sales;
        } else {
          console.log('API returned status false or data not found.');
        }
      },
      (error: any) => {
        console.error('Error fetching sale count:', error);
      }
    );
  }

  totalRevenue(): void {
    this.saleService.salesRevenue().subscribe(
      (res: any) => {
        if (res.success) {
          this.revenue = res.totalRevenue;
        } else {
          console.log('API returned status false or data not found.');
        }
      },
      (error: any) => {
        console.error('Error fetching total revenue:', error);
      }
    );
  }

  countTotalCustomers(): void {
    const uniqueContacts = new Set(this.sales.map((sale) => sale.bcontact));
    this.totalCustomerCount = uniqueContacts.size;
  }
}
