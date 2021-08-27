import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfigTab } from '@tools/abstracts/config-tab.abstract';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sla-twofa',
  templateUrl: './twofa.component.html',
  styleUrls: ['./twofa.component.scss']
})
export class TwofaComponent extends ConfigTab implements OnInit {

  constructor(
    protected matSnackBar: MatSnackBar
    ) {
    super(matSnackBar);
  }

  ngOnInit(): void {
  }

}
