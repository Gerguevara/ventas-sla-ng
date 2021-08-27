import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sla-twofa',
  templateUrl: './twofa.component.html',
  styleUrls: ['./twofa.component.scss']
})
export class TwofaComponent implements OnInit {

  codeControl: FormControl;
  codePlaceholder = '### ###';
  constructor() {
    this.codeControl = new FormControl();
  }

  ngOnInit(): void {
  }

}
