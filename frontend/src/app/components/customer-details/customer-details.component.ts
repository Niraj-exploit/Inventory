import { Component, OnInit } from '@angular/core';
import { SaleService } from 'src/app/service/Sale.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {
  sales: any;
  uniqueCustomers: any[] = [];

  constructor(private saleService: SaleService) { }

  ngOnInit() {
    this.latestSale();
  }

  latestSale(): void {
    this.saleService.latestSale().subscribe(
      (res: any) => {
        if (res.success) {
          this.sales = res.sales;
          this.getUniqueCustomers();
        } else {
          console.log('API returned status false or data not found.');
        }
      },
      (error: any) => {
        console.error('Error fetching latest Sale:', error);
      }
    );
  }

  getUniqueCustomers(): void {
    const uniqueCustomersMap = new Map<string, any>();

    this.sales.forEach((sale: any) => {
      const customerKey = `${sale.bname}-${sale.bemail}-${sale.bcontact}-${sale.baddress}`;
      if (!uniqueCustomersMap.has(customerKey)) {
        uniqueCustomersMap.set(customerKey, {
          bname: sale.bname,
          bemail: sale.bemail,
          bcontact: sale.bcontact,
          baddress: sale.baddress
        });
      }
    });

    this.uniqueCustomers = Array.from(uniqueCustomersMap.values());
  }
  reloadWebsite(): void {  
    window.location.reload();
  }
  
}
