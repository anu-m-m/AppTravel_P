import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PackageComponent } from './package.component';
import { ListPackageComponent } from './list-package/list-package.component';
import { AddPackageComponent } from './add-package/add-package.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    PackageComponent,
    ListPackageComponent,
    AddPackageComponent
  ],
  imports: [
    CommonModule,
    TooltipModule,
    FormsModule
  ],
  exports:[PackageComponent]
})
export class PackageModule { }
