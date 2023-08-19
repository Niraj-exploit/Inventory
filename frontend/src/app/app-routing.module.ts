import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { StockComponent } from './components/stock/stock.component';
import { VendorDetailsComponent } from './components/vendor-details/vendor-details.component';
import { SystemUserComponent } from './components/system-user/system-user.component';
import { PurchaseProductComponent } from './components/purchase-product/purchase-product.component';
import { SellProductComponent } from './components/sell-product/sell-product.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { CategoryComponent } from './components/category/category.component';
import { CustomerDetailsComponent } from './components/customer-details/customer-details.component';
import { authGuardService } from './guard/authGuard';
import { RoleGuardService } from './guard/roleGuard.service';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuardService],
  },
  { path: 'stock', component: StockComponent, canActivate: [authGuardService] },
  {
    path: 'customer-details',
    component: CustomerDetailsComponent,
    canActivate: [authGuardService],
  },
  {
    path: 'vendor-details',
    component: VendorDetailsComponent,
    canActivate: [RoleGuardService, authGuardService],
    data: { allowedRoles: ['ADMIN','EDITOR'] },
  },
  {
    path: 'system-users',
    component: SystemUserComponent,
    canActivate: [RoleGuardService, authGuardService],
    data: { allowedRoles: ['ADMIN'] },
  },
  {
    path: 'purchase-product',
    component: PurchaseProductComponent,
    canActivate: [RoleGuardService, authGuardService],
    data: { allowedRoles: ['ADMIN','EDITOR'] },
  },
  {
    path: 'sell-product',
    component: SellProductComponent,
    canActivate: [authGuardService],
  },
  {
    path: 'error',
    component: ErrorPageComponent,
    canActivate: [authGuardService],
  },
  {
    path: 'category',
    component: CategoryComponent,
    canActivate: [authGuardService],
  },
  { path: '**', redirectTo: 'error' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
