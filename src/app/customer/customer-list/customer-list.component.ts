import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  @Input() customer: any[]; 
  custDetails=[];

  constructor() { }

  ngOnInit(): void {
    this.getCustomerDetails();
  }
  getCustomerDetails(){
    this.custDetails = this.customer;
  }

}
