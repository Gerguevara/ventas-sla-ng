import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss']
})
export class EmailVerificationComponent implements OnInit {

  spinner = true;

  constructor( public dialog: MatDialog ) { }

  ngOnInit(): void {
    this.openDialog();
  }

  openDialog(): void {
    this.dialog.open( DialogElements );
  }

}

@Component({
  selector: 'dialog-elements',
  templateUrl: 'dialog-elements.html',
  styleUrls: ['./email-verification.component.scss']
})
export class DialogElements {

  constructor( private router: Router ){}

  regresar(): void {
    this.router.navigate(['/autentication/login']);
  }
}
