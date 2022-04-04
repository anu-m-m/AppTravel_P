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
  countries = ['India','China','Japan','Russia'];
  India = ['Kerala','Karnadaka','Tamilnadu'];
  Kerala = ['Ernklm','tvm','clt'];
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
