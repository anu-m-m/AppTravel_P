import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './customer.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { FormsModule } from '@angular/forms';
import { PackageModule } from '../package/package.module';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

@NgModule({
  declarations: [
    CustomerComponent,
    CustomerListComponent,
    AddCustomerComponent
  ],
  imports: [
    CommonModule,
    TooltipModule,
    FormsModule,
    PackageModule,
    TypeaheadModule
  ]
})
export class CustomerModule { }
