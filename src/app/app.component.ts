import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  packages1 = {
    name: 'Anju',
    age:23
  };
  title = 'travelManage';

  constructor(){
    // Object assign
    this.packages1 = Object.assign(this.packages1, {lastname: 'Thampi'})
    console.log('Packages1',this.packages1);
    const NewPack = Object.assign({}, this.packages1, {location: 'PTA'});
    console.log('NewPack:',NewPack)
  }
}
