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
  customerId;
  customerFName;
  customerLName;
  customerName;
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
  r1;
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

  countries = ['Armenia','Bahrain','Bangladesh','Bhutan','Brunei', 'Cambodia','China','Georgia','India','Indonesia','Iran','Iraq','Israel', 'Japan','Jordan','Kazakhstan','Kuwait','Malaysia','Maldives','Mongolia','Myanmar','Nepal','North Korea','Oman','Pakistan','Philippines','Qatar','Russia','Saudi Arabia','Singapore','South Korea','Sri Lanka','Syria','Taiwan','Thailand','United Arab Emirates','Uzbekistan','Vietnam','Yemen'];
  states = {
    India: ['Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttarakhand', 'Uttar Pradesh', 'West Bengal', 'Andaman and Nicobar Islands', 'Chandigarh',  'Delhi', 'Lakshadweep', 'Puducherry'],
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

  customerIds = [];
  
  constructor(private custService: CustomerService,
    private custroute: Router,
    private pckService: PackageService) { }

  ngOnInit(): void {
    this.getPackages();
    this.custService.getExsistingcustomerIds().subscribe((custIds) => {
        const ids:number[]=[];
        custIds.forEach((id)=>{
          const _id = id.split('_')[1];
          ids.push(parseInt(_id));
  
        })
        const newId = Math.max(...ids) + 1;
        this.customerId ='PKG_'+newId;
    });
    // this.getRadioButton();
  }
  addCust() {
    const customer = {
      customerId: this.customerId,
      customerName: this.customerFName.concat('\t',this.customerLName),
      phoneNumber: this.custPhoneNumber,
      email: this.email,
      selectedPackage: this.selectedPKG,
      tripDays: this.tripDays,
      tripStartDate: this.tripStart,
      tripEndDate: this.tripEnd,
      price: this.packageCost,
      address: this.houseName+''+this.country+''+this.state+''+this.district+''+this.locality,
      boardingLocation: this.boardingLoc,
      foodOptions: this.selectedFoodOptions,
      subLocations: this.selectedSubLocations,
      travelMode: this.travelMode
    }
    this.custService.addNewCustomer(customer);
    this.custroute.navigate(['/customer']);
  }

  // getRadioButton() {
  //   console.log('Value:', this.input3.nativeElement.value);
  // }
  getPackages() {
    this.pckService.fetchPackages().subscribe((pkgs) => {
      this.packages = pkgs;
      pkgs.forEach((pkg) => {
        this.packageIdmap[pkg.pkgId] = pkg.pkdName;
      })
    })
  }

  changePackage() {
    this.packages.forEach((pkg) => {
      if (pkg.pkgId === this.selectedPKG) {
        this.custPrice = pkg.price;
        this.packageCost = pkg.price;
        this.selectedPackageTravelOptions = pkg.travelOptions;
        this.tripMax = pkg.tripDays;
        this.tripDays = pkg.tripDays;
        //spread operator
        this.packageFoodOptions = [...pkg.foodOptions];
        this.packageSubLocations = [...pkg.subLocations];
        this.selectedFoodOptions = [...pkg.foodOptions];
        this.selectedSubLocations = [...pkg.subLocations];
      }
    });
  }

  updateFoodOption(fdOption) {
    if(this.selectedFoodOptions.includes(fdOption)){
      const findex = this.selectedFoodOptions.indexOf(fdOption);
      this.selectedFoodOptions.splice(findex, 1);
      this.custPrice = (this.custPrice - ((this.packageCost*10)/100));
    }
    else{
      this.selectedFoodOptions.push(fdOption);
      this.custPrice = (this.custPrice + ((this.packageCost*10)/100));
    }
  }

  updateSubLocations(subLoc) {
    if(this.selectedSubLocations.includes(subLoc)){
      const findex = this.selectedSubLocations.indexOf(subLoc);
      this.selectedSubLocations.splice(findex, 1);// remove 
      this.custPrice = (this.custPrice - ((this.packageCost*10)/100));
      this.tripDays --;
    }
    else{
      this.selectedSubLocations.push(subLoc);//adding      
      this.tripDays ++;
      this.custPrice = (this.custPrice + ((this.packageCost*10)/100));
    
    }
  }

  
}