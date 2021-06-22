import { FormProductoComponent } from './../form-producto/form-producto.component';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-index-producto',
  templateUrl: './index-producto.component.html',
  styleUrls: ['./index-producto.component.scss']
})
export class IndexProductoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  scroll(el: HTMLElement) {
    el.scrollIntoView();
}

}
