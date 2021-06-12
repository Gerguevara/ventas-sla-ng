import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AutenticacionService } from '../../services/autenticacion.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  message: string;
}

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss']
})
export class EmailVerificationComponent implements OnInit {

  spinner = true;

  constructor( public dialog: MatDialog,
               private activeRouter: ActivatedRoute,
               private auth: AutenticacionService ) { }

  ngOnInit(): void {
    this.activeRouter.params.subscribe( params => {
      this.auth.emailVerification( params.id, params.hash ).subscribe( (response: any) => {
        console.log( response.mensaje );
        this.openDialog( response.mensaje );
      },
      ( error: any ) => {
        console.log( error );
        this.openDialog( error );
      });
    });
  }

  openDialog( message: string ): void {
    this.dialog.open( DialogElementsEmail, { data: { message } } );
  }

}

@Component({
  selector: 'dialog-elements',
  templateUrl: 'dialog-elements.html',
  styleUrls: ['./email-verification.component.scss']
})
export class DialogElementsEmail {

  constructor( public dialogRef: MatDialogRef<DialogElementsEmail>,
               @Inject(MAT_DIALOG_DATA) public data: DialogData,
               private router: Router ){}

  regresar(): void {
    this.router.navigate(['/autentication/login']);
  }
}
