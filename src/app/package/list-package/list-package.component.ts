import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
@Component({
  selector: 'app-list-package',
  templateUrl: './list-package.component.html',
  styleUrls: ['./list-package.component.css']
})
export class ListPackageComponent implements OnInit, OnChanges {
  @Input() packg: any[];
  @Input() test: number;
  testNew: number;
  filteredPackages;
  constructor( ) { }

  ngOnInit(): void {
    this.testNew = this.test;
    this.filteredPackages = this.packg.map((data) => { return data;});
  }
  ngOnChanges(changes: SimpleChanges): void {
    const { packg, test } = changes;
    if(packg && packg.currentValue){
      this.filteredPackages = packg.currentValue;
      console.log('Package', packg.currentValue);
    }
    if(test && test.currentValue){
      this.testNew = this.test;
      console.log('Test', test.currentValue);
    }
  }

}
