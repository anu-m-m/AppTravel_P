import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
//  import { HttpClient } from '@angular/common/http'
interface Person {
  name: string;
  age: number;
  phone: number;
  qlf:string;
}
@Injectable({
  providedIn: 'root'
})
export class PackageService {
  packages = [
    {
      pkgId:'PKG_1',
      pkdName:'Trivandrum Holiday',
      pkgDesc:'' ,
      destination: 'Trivandrum',
      subLocations: ['Kovalam', 'Varkala', 'Kanyakumari'],
      tripDays: 3,
      travelOptions: ['Bus','Train', 'Car'],
      foodOptions: ['Breakfast', 'Lunch', 'Dinner'],
      price: 20000
    },
    {
      pkgId:'PKG_2',
      pkdName:'Kochi',
      pkgDesc:'' ,
      destination: 'Kochi',
      subLocations: ['Fortkochi', 'Marinedrive', 'Cherai'],
      tripDays: 2,
      travelOptions: ['Bus', 'Train', 'Car'],
      foodOptions: ['Breakfast', 'Lunch', 'Dinner'],
      price: 30000
    },
    {
      pkgId:'PKG_3',
      pkdName:'Wayanad Holiday',
      pkgDesc:'' ,
      destination: 'Wayanad',
      subLocations: ['Edakkal', 'Banasagar', 'Vythiri'],
      tripDays: 2,
      travelOptions: ['Bus', 'Car'],
      foodOptions: ['Breakfast', 'Lunch', 'Dinner'],
      price: 3000
    },
    {
      pkgId:'PKG_4',
      pkdName:'Thrissur Holiday',
      pkgDesc:'' ,
      destination: 'Thrissur',
      subLocations: ['t1', 't2', 't3'],
      tripDays: 2,
      travelOptions: ['Bus', 'Train', 'Car'],
      foodOptions: ['Breakfast', 'Lunch', 'Dinner'],
      price: 3000
    },
    {
      pkgId:'PKG_5',
      pkdName:'Kottayam Holiday',
      pkgDesc:'' ,
      destination: 'Kottayam',
      subLocations: ['k1', 'k2', 'k3'],
      tripDays: 2,
      travelOptions: ['Bus', 'Train', 'Car'],
      foodOptions: ['Breakfast', 'Lunch', 'Dinner'],
      price: 3000
    }
   ];
   employee = [
    {
      name: 'Anu', 
      age: 26, 
      phone: 989,
      qlf: 'BE'}

   ];

  //  private http: HttpClient
  constructor(  ) { }

  getUserName(){
    return this.packages;
  }
  fetchPackages(): Observable<any[]>{
    return of(this.packages);
  }
  getMyname(): Observable<string>{
    return of('Anu'); 
  }
  getPersonName(): Observable<Person[]>{
    return of(this.employee);
  }
  getUserRole(){
    return 'Admin';
  }
  addPackage(pkg: any){
    this.packages.push(pkg);
    console.log('NewPackages',this.packages);
  }
  getExsistingPackageIds(): Observable<string[]>{
    const packageIds =[];
    this.packages.map((pkg)=>{
      packageIds.push(pkg.pkgId);
    });
    return of(packageIds);

  }

  // addPackage(): Observable<any>{
  //   return this.http.post('', {});
  // }
}
