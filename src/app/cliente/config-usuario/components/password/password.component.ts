import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { ConfigTab } from '@tools/abstracts/config-tab.abstract';

@Component({
  selector: 'sla-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent extends ConfigTab implements OnInit {

  constructor(
    protected matSnackBar: MatSnackBar,
  ) {
    super(matSnackBar);
  }

  ngOnInit(): void {
  }

}
