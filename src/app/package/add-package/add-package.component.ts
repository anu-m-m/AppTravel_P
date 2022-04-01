import { Component, OnInit } from '@angular/core';
import {PackageService} from './../service/package.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-package',
  templateUrl: './add-package.component.html',
  styleUrls: ['./add-package.component.css']
})
export class AddPackageComponent implements OnInit {
  isEditMode = false;
  packageName;
  location;
  sublocation;
  tripdays;
  travelOptions= [];
  foodOptions= [];
  price;
  sublocations = [];
  sublocationError = '';
  subloc;
  currentPackageId='';

  constructor( private service:PackageService, private rtr: Router) { }

  ngOnInit(): void {
    this.getPkgId();
  }
  addSublocation(){
    this.sublocationError = '';
    if(this.sublocations.length >= 5){
      this.sublocationError = 'Maximum limit is 5';
      this.sublocation = ''; 
      setTimeout(()=>{this.sublocationError = '';},3000);

      return;
    }
   if(this.sublocations.includes(this.sublocation)){
      this.sublocationError = 'Duplicate Sublocation';
      return;
    }
    if(this.sublocation){
        this.sublocations.push(this.sublocation);
        this.sublocation = ''; 
    }

    
  }
  onRemoveSublocation(val){
    const index = this.sublocations.indexOf(val);
    this.sublocations.splice(index,  1);
  }
  validateAndAddPackage(){
    if(
      this.packageName && 
      this.location &&
      this.sublocations.length &&
      this.tripdays &&
      this.travelOptions.length &&
      this.foodOptions.length &&
      this.price
    ){
      this.addPackage();
    }
  }
  addPackage(){
    const pkg = { 
      pkgId:this.getPkgId(),
      pkdName:this.packageName,
      pkgDesc:'' ,
      destination:this.location,
      subLocations:this.sublocations ,
      tripDays:this.tripdays,
      travelOptions:this.travelOptions,
      foodOptions:this.foodOptions,
      price:this.price
    };
    this.service.addPackage(pkg);
    this.rtr.navigate(['/package/list-package']);
  }
  getPkgId(){
    this.service.getExsistingPackageIds().subscribe((pkgIds)=>{
      const ids:number[]=[];
      pkgIds.forEach((pkgId)=>{
        console.log('split',pkgId.split('_'));
        const id = pkgId.split('_')[1];
        ids.push(parseInt(id));

      })
      const newId = Math.max(...ids) + 1;
      console.log(newId);
      // return 'PKG_'+newId;
      this.currentPackageId ='PKG_'+newId;
    })
    return this.currentPackageId;
  }
  updateTravelOption(option){
    if(this.travelOptions.includes(option)){
      const index = this.travelOptions.indexOf(option);
      this.travelOptions.splice(index, 1);
    }
    else{
      this.travelOptions.push(option);
    }
    console.log(this.travelOptions);
  }
  updateFoodOptions(fdOption){
    if(this.foodOptions.includes(fdOption)){
      const findex = this.foodOptions.indexOf(fdOption);
      this.foodOptions.splice(findex, 1);
    }
    else{
      this.foodOptions.push(fdOption);
    }
    console.log(this.foodOptions);
  }

}
