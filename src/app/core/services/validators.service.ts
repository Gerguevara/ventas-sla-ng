import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  constructor() { }

  /* Este validador personalizado se encarga de mantener el formulario inválido mientras
     ambas contraseñas especificadas no sean iguales */
  contraseñasIguales( pass1: string, pass2: string ) {
    return ( formGroup: FormGroup ) => {
      const pass1Control = formGroup.controls[ pass1 ];
      const pass2Control = formGroup.controls[ pass2 ];

      if ( pass1Control.value === pass2Control.value ) {
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({ noEsIgual: true });
      }
    };
  }

  /* Validador personalizado para seguridad de contraseña en base a una expresión regular:
     - Mínimo 8 caracteres
     - Máximo 30 caracteres
     - Al menos una mayúscula y una minúscula
     - Al menos un dígito
     - No espacios en blanco
     - Al menos un caracter especial.*/
  seguridadPassword( pass: string ) {
    return ( formGroup: FormGroup ) => {
      const pass1Control = formGroup.controls[ pass ];
      const regexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,30}$/;

      if ( regexp.test(pass1Control.value) ) {
        pass1Control.setErrors(null);
      } else {
        pass1Control.setErrors({ pattern: true });
      }
    };
  }

}
