import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  packages1 = {
    name: 'Anu',
    age:123
  };
  title = 'travelManage';

  constructor(){
    // Object assign
    this.packages1 = Object.assign(this.packages1, {lastname: 'mm'})
    console.log('Packages1',this.packages1);
    const NewPack = Object.assign({}, this.packages1, {location: 'clt'});
    console.log('NewPack:',NewPack)
  }
}
