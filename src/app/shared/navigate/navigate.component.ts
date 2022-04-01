import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navigate',
  templateUrl: './navigate.component.html',
  styleUrls: ['./navigate.component.css']
})
export class NavigateComponent implements OnInit {
  
  constructor(private rtr: Router) {

   }

  ngOnInit(): void {
  }

  // onSelect(val){
  //   const abc = 'Link 2';
  //   this.rtr.navigate([`/${val}`], { state: { abc }})
  // }

}
