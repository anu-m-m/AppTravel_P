import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  customers = [
    {
      customerId: 'CUST_000001',
      customerType: 'NON_PACKAGE',
      customerName: 'customer1',
      phoneNumber: 9004123456,
      email: 'customer1@gmail.com',
      selectedPackage: 'PKG_1',
      tripDays: 10,
      tripStartDate: '2022-03-11',
      tripEndDate: '2022-03-20',
      price: 30000,
      address: 'ADDRESS_1',
      boardingLocation: '',
      foodOptions: ['Breakfast', 'Lunch', 'Dinner'],
      travelMode: 'Bus'
      // discount:
      // tripStatus:
    },
    {
      customerId: 'CUST_000002',
      customerType: 'NON_PACKAGE',
      customerName: 'customer2',
      phoneNumber: 9878123456,
      email: 'customer2@gmail.com',
      selectedPackage: 'PKG_2',
      tripDays: 10,
      tripStartDate: '2022-03-11',
      tripEndDate: '2022-03-20',
      price: 30000,
      address: 'ADDRESS_2',
      boardingLocation: '',
      foodOptions: ['Breakfast', 'Lunch', 'Dinner'],
      travelMode: 'Bus'
    },
    {
      customerId: 'CUST_000003',
      customerType: 'NON_PACKAGE',
      customerName: 'customer3',
      phoneNumber: 9526123456,
      email: 'customer3@gmail.com',
      selectedPackage: 'PKG_3',
      tripDays: 10,
      tripStartDate: '2022-03-11',
      tripEndDate: '2022-03-20',
      price: 30000,
      address: 'ADDRESS_3',
      boardingLocation: '',
      foodOptions: ['Breakfast', 'Lunch', 'Dinner'],
      subLocations: ['loc1', 'loc2', 'loc3'],
      travelMode: 'Bus'
    }
  ];
  constructor() { }
  fetchCustomerDetails(): Observable<any[]> {
    return of(this.customers);
  }
  addNewCustomer(cust: any) {
    this.customers.push(cust);
  }
  getExsistingcustomerIds(): Observable<string[]> {
    const customerIds = [];
    this.customers.map((item) => {
      customerIds.push(item.customerId);
    });
    return of(customerIds);
  }
  deletecustomer(id: string) {
    const customers = [];
    this.customers.map((cust) => {
      if (cust.customerId !== id) {
        customers.push(cust);
      }
    });
    this.customers = customers;
  }

}
