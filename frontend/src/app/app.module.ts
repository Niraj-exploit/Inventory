import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataTablesModule } from 'angular-datatables';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopbarComponent } from './layouts/topbar/topbar.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { CategoryComponent } from './components/category/category.component';
import { CustomerDetailsComponent } from './components/customer-details/customer-details.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { LoginComponent } from './components/login/login.component';
import { PurchaseProductComponent } from './components/purchase-product/purchase-product.component';
import { SellProductComponent } from './components/sell-product/sell-product.component';
import { StockComponent } from './components/stock/stock.component';
import { SystemUserComponent } from './components/system-user/system-user.component';
import { VendorDetailsComponent } from './components/vendor-details/vendor-details.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    SidebarComponent,
    FooterComponent,
    CategoryComponent,
    CustomerDetailsComponent,
    DashboardComponent,
    ErrorPageComponent,
    LoginComponent,
    PurchaseProductComponent,
    SellProductComponent,
    StockComponent,
    SystemUserComponent,
    VendorDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    DataTablesModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
