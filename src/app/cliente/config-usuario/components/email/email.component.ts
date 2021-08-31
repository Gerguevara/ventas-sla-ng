import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, AbstractControl, AbstractControlOptions, ValidatorFn, ValidationErrors } from '@angular/forms';
import { ConfigTab } from '@tools/abstracts/config-tab.abstract';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'sla-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent extends ConfigTab implements OnInit {
  formGroup: FormGroup;
  @Output()
  emailChange = new EventEmitter<string>();
  constructor(
    protected formBuilder: FormBuilder,
    protected matSnackBar: MatSnackBar,
    ) {
      super(matSnackBar);
      this.formGroup = formBuilder.group(
        {
          new_email : [],
          new_email_confirmation : [],
        },
        {
          validators: this.emailConfirmation as ValidatorFn
        } as AbstractControlOptions
      )
  }

  ngOnInit(): void {
  }

  changeMailHandler($event: MouseEvent){
    if(this.formGroup.valid){
      this.emailChange.emit();
    } else {
      this.matSnackBar.open('Campos invalidos, por favor revisa', 'Cerrar', {
        duration: 3000,
      })
    }
  }

  getCurrentMail(): string{
    return this.user? this.user.email : '';
  }

  emailConfirmation(c: AbstractControl): ValidationErrors | null {
    const comparisonA = c.get('new_email');
    const comparisonB = c.get('new_email_confirmation');
    if(comparisonA && comparisonB){
      if (comparisonA.value === comparisonB.value) {
        return null;
      } else {
        return { nonEqualEmail: `${comparisonA} does not match ${comparisonB}` };
      }
    } else {
      return { bothFieldRequired: `${comparisonA} and ${comparisonB} are both required` };
    }
  }

  get newEmailControl(): FormControl {
    return this.formGroup.get('new_email') as FormControl;
  }
  get newEmailConfirmationControl(): FormControl {
    return this.formGroup.get('new_email_confirmation') as FormControl;
  }

}
