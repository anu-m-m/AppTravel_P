import { Component, OnInit, OnChanges, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { CustomerService } from '../service/customer.service';
import { Router } from '@angular/router';
import { PackageService } from 'src/app/package/service/package.service';
@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {
  @ViewChild('input3') input3: ElementRef;
  customerFName;
  customerLName;
  custPhoneNumber;
  email;
  selectedPKG;
  tripDays;
  tripStart = new Date().toISOString().slice(0, 10);
  tripEnd;
  packageCost;
  custPrice;
  boardingLoc;
  travelMode;
  packages;
  tripStartMinDate = new Date().toISOString().slice(0, 10);
  // tripStartMaxDate = new Date(2023);
  packageIds = [];
  packageIdmap = {};
  warning = false;
  tripMax = 1;
  selectedPackageTravelOptions = [];
  houseName;
  country;
  state;
  district;
  locality;
  countries = ['Armenia', 'Bahrain', 'Bangladesh', 'Bhutan', 'Brunei', 'Cambodia', 'China', 'Georgia', 'India', 'Indonesia', 'Iran', 'Iraq', 'Israel', 'Japan', 'Jordan', 'Kazakhstan', 'Kuwait', 'Malaysia', 'Maldives', 'Mongolia', 'Myanmar', 'Nepal', 'North Korea', 'Oman', 'Pakistan', 'Philippines', 'Qatar', 'Russia', 'Saudi Arabia', 'Singapore', 'South Korea', 'Sri Lanka', 'Syria', 'Taiwan', 'Thailand', 'United Arab Emirates', 'Uzbekistan', 'Vietnam', 'Yemen'];
  states = {
    India: ['Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttarakhand', 'Uttar Pradesh', 'West Bengal', 'Andaman and Nicobar Islands', 'Chandigarh', 'Delhi', 'Lakshadweep', 'Puducherry'],
    China: ['Beijing', 'Shanghai', 'Shanxi'],
    Japan: ['Tohoku', 'Tottori', 'Saitama'],
    Indonesia: ['Bali', 'Papua', 'Lampung']
  }

  districts = {
    Kerala: [
      'Kannur',
      'Kasaragod',
      'Kollam',
      'Kottayam',
      'Kozhikode',
      'Malappuram',
      'Palakkad',
      'Pathanamthitta',
      'Ernakulam'
    ],
    karnataka: [
      'Bagalkot',
      'Ballari',
      'Belagavi',
      'Bengaluru',
      'Bengaluru',
      'Bidar',
      'Chamarajanagar',
      'Chikballapur'
    ],
    tamilnadu: [
      'Ariyalur',
      'Chengalpattu',
      'Chennai',
      'Coimbatore',
      'Cuddalore',
      'Dharmapuri',
      'Dindigul',
      'Erode'
    ]
  };

  localities = {
    Ernakulam: ['Fortkochi', 'Mattancherry', 'Vypin', 'Highcourt', 'Kaloor', 'Palarivattom', 'Edappalli', 'Vytilla']
  }

  packageFoodOptions = [];
  selectedFoodOptions = [];
  packageSubLocations = [];
  selectedSubLocations = [];
  editCustomerDetails = {};

  customerId;
  isEdit = false;

  constructor(private custService: CustomerService,
    private custroute: Router,
    private pckService: PackageService) {
    const navigation = this.custroute.getCurrentNavigation();
    if (navigation && navigation.extras && navigation.extras.state) {
      const { state } = navigation.extras;
      if (state['customer']) {
        this.isEdit = true;
        console.log("log",state['customer']);
        this.editCustomerDetails = state['customer'];
        const nameArray = state['customer'].customerName.split(' ');
        console.log('array name', nameArray);
        this.customerFName = nameArray[0];
        this.customerLName = nameArray[1];
        this.boardingLoc = state['customer'].boardingLocation;
        this.email = state['customer'].email;
        this.custPhoneNumber = state['customer'].phoneNumber;
        this.customerId = state['customer'].customerId;
        this.selectedPKG = state['customer'].selectedPackage;
        this.travelMode = state['customer'].travelMode;
        this.selectedFoodOptions = state['customer'].selectedFoodOptions;
        this.tripDays = state['customer'].tripDays;
        this.selectedSubLocations = state['customer'].sublocations;
        this.custPrice = state['customer'].price;
        const address = state['customer'].address.split(' ');
        this.houseName =address[0];
        this.district =address[1];
        this.country =address[2];
        this.country =address[3];
        this.locality =address[4];
      }
    }
  }

  ngOnInit(): void {
    this.getPackages();
    if (!this.isEdit) {
      this.getNewCustomerId();
    }
    else{}
  }

  getNewCustomerId() {
    this.custService.getExsistingcustomerIds().subscribe((custIds) => {
      const ids: number[] = [];
      custIds.forEach((id) => {
        const _id = id.split('_')[1];
        ids.push(parseInt(_id));

      })
      const newId = Math.max(...ids) + 1;
      this.customerId = 'CUST_' + newId;
    });
  }

  getCustomerObj() {
    return {
      customerId: this.customerId,
      customerType: (this.packageSubLocations.length === this.selectedSubLocations.length) ? 'PACKAGE' : 'NON_PACKAGE',
      customerName: this.customerFName.concat('\t', this.customerLName),
      boardingLocation: this.boardingLoc,
      phoneNumber: this.custPhoneNumber,
      email: this.email,
      address: this.houseName + ' ' + this.locality + ' ' + this.district + ' ' + this.state + ' ' + this.country,
      selectedPackage: this.selectedPKG,
      tripDays: this.tripDays,
      tripStartDate: this.tripStart,
      tripEndDate: this.tripEnd,
      price: this.custPrice,
      foodOptions: this.selectedFoodOptions,
      subLocations: this.selectedSubLocations,
      travelMode: this.travelMode
    }
  }
  addCust() {
    // const customer = this.getCustomerObj(); 
    // this.custService.addNewCustomer(customer);
    this.custService.addNewCustomer(this.getCustomerObj());
    this.custroute.navigate(['/customer']);
  }

  updateCust() {
    this.custService.addNewCustomer(this.getCustomerObj());
    this.custroute.navigate(['/customer']);
  }

  getPackages() {
    this.pckService.fetchPackages().subscribe((pkgs) => {
      this.packages = pkgs;
      pkgs.forEach((pkg) => {
        this.packageIdmap[pkg.pkgId] = pkg.pkdName;
      })
      if (this.isEdit) {
        this.changePackage();
      }
    })
  }

  changePackage() {
    this.packages.forEach((pkg) => {
      if (pkg.pkgId === this.selectedPKG) {
        if (!this.isEdit) {
          this.custPrice = pkg.price;
          this.tripDays = pkg.tripDays;
          this.selectedFoodOptions = [...pkg.foodOptions];
          this.selectedSubLocations = [...pkg.subLocations];
        } else {
          this.custPrice = this.editCustomerDetails['price'];
          this.tripDays = this.editCustomerDetails['tripDays'];
          this.selectedFoodOptions = (this.editCustomerDetails['selectedPackage'] === pkg.pkgId) ?
            [...this.editCustomerDetails['foodOptions']] : [...pkg.foodOptions];
          this.selectedSubLocations = (this.editCustomerDetails['selectedPackage'] === pkg.pkgId) ?
            [...this.editCustomerDetails['subLocations']] : [...pkg.subLocations];
        }
        this.packageCost = pkg.price;
        this.selectedPackageTravelOptions = pkg.travelOptions;
        this.tripMax = pkg.tripDays;
        this.packageFoodOptions = [...pkg.foodOptions];
        this.packageSubLocations = [...pkg.subLocations];
      }
    });
  }

  updateFoodOption(fdOption) {
    if (this.selectedFoodOptions.includes(fdOption)) {
      const indx = this.selectedFoodOptions.indexOf(fdOption);
      this.selectedFoodOptions.splice(indx, 1);
      this.custPrice = (this.custPrice - ((this.packageCost * 10) / 100));
    }
    else {
      this.selectedFoodOptions.push(fdOption);
      this.custPrice = (this.custPrice + ((this.packageCost * 10) / 100));
    }
  }

  updateSubLocations(subLoc) {
    if (this.selectedSubLocations.includes(subLoc)) {
      const indx = this.selectedSubLocations.indexOf(subLoc);
      this.selectedSubLocations.splice(indx, 1);
      this.custPrice = (this.custPrice - ((this.packageCost * 10) / 100));
      this.tripDays--;
    }
    else {
      this.selectedSubLocations.push(subLoc);
      this.custPrice = (this.custPrice + ((this.packageCost * 10) / 100));
      this.tripDays++;
    }
  }

}
