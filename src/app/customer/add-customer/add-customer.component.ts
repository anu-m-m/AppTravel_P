import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CustomerService } from '../service/customer.service';
import { Router } from '@angular/router';
import { PackageService } from 'src/app/package/service/package.service';
@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {
  customerName;
  custPhoneNumber;
  email;
  selectedPKG;
  tripDays;
  tripStart = new Date().toISOString().slice(0, 10) ;
  tripEnd;
  tripMax;
  custPrice;
  custAddress;
  boardingLoc;
  foodOpt;
  travelMode;
  packages;
  tripStartMinDate = new Date().toISOString().slice(0, 10) ; 
  // tripStartMaxDate = new Date(2023);
  packageIds = [];
  packageIdmap = {};
  warning =false;
  selectedPackageTravelOptions=[]; 
  fName;
  lName;
  hName;
  country;
  state;
  district;
  locality;
  countries = ['Armenia','Azerbaijan','Bahrain','Bangladesh','Bhutan','Brunei', 'Cambodia','China','Cyprus','Georgia','India','Indonesia','Iran','Iraq','Israel', 'Japan','Jordan','Kazakhstan','Kuwait','Kyrgyzstan','Laos','Lebanon','Malaysia','Maldives','Mongolia','Myanmar','Nepal','North Korea','Oman','Pakistan','Palestine','Philippines','Qatar','Russia','Saudi Arabia','Singapore','South Korea','Sri Lanka','Syria','Taiwan','Tajikistan','Thailand','Timor Leste','Turkey','Turkmenistan','United Arab Emirates','Uzbekistan','Vietnam','Yemen']
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
      'Ernakulam',
      'Wayanad'
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

  constructor( private custService:CustomerService,
    private custroute:Router,
    private pckService: PackageService) { }

  ngOnInit(): void {
    this.getPackages();
  }
  addCust(){
    const customer = {
      customerName:this.customerName,
      phoneNumber:this.custPhoneNumber,
      email:this.email,
      selectedPackage:this.selectedPKG,
      tripDays:this.tripDays,
      tripStartDate:this.tripStart,
      tripEndDate:this.tripEnd,
      price:this.custPrice,
      address:this.custAddress,
      boardingLocation:this.boardingLoc,
      foodOptions:this.foodOpt,
      travelMode:this.travelMode
    }
    this.custService.addNewCustomer(customer);
    this.custroute.navigate(['/customer']);
    console.log(customer);
  }
  getPackages(){
    this.pckService.fetchPackages().subscribe((pkgs)=>{
      this.packages = pkgs;
      pkgs.forEach((pkg)=>{
        this.packageIdmap[pkg.pkgId] = pkg.pkdName;
      })

      console.log('PackageIdmap',this.packageIdmap);
      console.log('package2',this.packageIdmap['PKG_2']);
    })

  }
  changePackage(){
    this.packages.forEach((pkg)=>{
        if(pkg.pkgId === this.selectedPKG){
          this.selectedPackageTravelOptions =pkg.travelOptions;
          console.log('Selected Package',pkg);
          console.log('Travel Options',this.selectedPackageTravelOptions);
        }
      });
  }
  
  
  
  
  
  // onChangeEndDate(){
  //   // console.log('TripEnd:-',this.tripEnd);
  //   // console.log('TripStart:-',this.tripStart);
  //   if(this.tripStart > this.tripEnd){
  //   alert("Please Change the start date");
  //   this.tripStartMaxDate = this.tripEnd;
  //   }
  // }
  // onChangeStartDate(){
  //   if(this.tripEnd < this.tripStart ){
  //     alert("Please Change the end date");
  //     this.tripStartMaxDate = this.tripStart;
  //     }
  // }

}
