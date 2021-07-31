import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-empleado-register-form-documents',
  templateUrl: './empleado-register-form-documents.component.html',
  styleUrls: ['./empleado-register-form-documents.component.scss']
})
export class EmpleadoRegisterFormDocumentsComponent implements OnInit {

  @Input()
  formGroup!: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.duiControl.valueChanges.subscribe(
      (value: string)=>{
        console.log(value.match(/[0-9]{8}/));
        if(value.length===8){
          const match = value.match(/[0-9]{8}/);
          if(match){
            const valueArr = match.input!.split("");
              if(valueArr[valueArr?.length - 1] !=='-'){
                this.duiControl.setValue(`${value}-`);
              }
          }
        } else if(value.length===9){
          if(value.match(/[0-9]{9}/)){
            let valueArray = value.split("");
            valueArray.splice(value.length - 2, 0, "-")
            this.duiControl.setValue(valueArray.toString());
          }
        }
      }
    )
    this.nitControl.valueChanges.subscribe(
      (value: string)=>{
        if(value.length===4){
          if(value.match(/[0-9]{4}/)){
            this.nitControl.setValue(`${value}-`);
          }
        } else if(value.length===11){
          if(value.match(/[0-9]{4}[-][0-9]{6}/)){
            this.nitControl.setValue(`${value}-`);
          }
        } else if(value.length===15){
          if(value.match(/[0-9]{4}[-][0-9]{6}[-][0-9]{3}/)){
            this.nitControl.setValue(`${value}-`);
          }
        }
      }
    )
  }

  getErrorMessage(control: FormControl){
    let message = '';
    let { errors } = control;
    if(errors){
      const errorsKeys = Object.keys(errors);
      errorsKeys.forEach((key: string) => {
        const errorMessage = String(key);
        message = message.concat(`${errorMessage} `);
      });
    }
    return message;
  }

  get duiControl(): FormControl {
    return this.formGroup.get('dui') as FormControl;
  }

  get nitControl(): FormControl {
    return this.formGroup.get('nit') as FormControl;
  }

  get afpControl(): FormControl {
    return this.formGroup.get('afp') as FormControl;
  }

  get isssControl(): FormControl {
    return this.formGroup.get('isss') as FormControl;
  }

}
