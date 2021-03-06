import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../service/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  @Input() customer: any[]; 
  custDetails=[];

  constructor(
    private custService: CustomerService,
    private routes: Router
    ) {}

  ngOnInit(): void {
    this.getCustomerDetails();
  }
  getCustomerDetails(){
    this.custDetails = this.customer;
  }

  deleteCustomer(id){
    this.custService.deletecustomer(id);
    this.custService.fetchCustomerDetails().subscribe((data) => {
      console.log("123",data);
      this.custDetails = data;
    });
  }

  editCustomer(customer){
    this.routes.navigate(['/customer/add'],{state: {customer}});
    console.log("rtr",this.customer);
  }

}
