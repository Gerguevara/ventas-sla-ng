import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndexRoutingModule } from './index-routing.module';
import { IndexContainer } from './index/index.container';
import { IndexTableComponent } from './index-table/index-table.component';


@NgModule({
  declarations: [
    IndexContainer,
    IndexTableComponent
  ],
  imports: [
    CommonModule,
    IndexRoutingModule
  ]
})
export class IndexModule { }
