import { Component, Input,  Output, EventEmitter } from '@angular/core';
import { LetterInputContext } from '@tools/models/LetterInputContext';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'lib-full-letter-input',
  templateUrl: './full-letter-input.component.html',
  styleUrls: ['./full-letter-input.component.scss']
})
export class FullLetterInputComponent {
  @Input()
  context!: LetterInputContext;
  @Input()
  globalSwitch!: boolean;
  @Input()
  editableState!: boolean;
  @Output()
  editableModeEnabled = new EventEmitter<boolean>();
  @Output()
  valueChanged = new EventEmitter<LetterInputContext>();

  switchControl: boolean = false;

  constructor(
    private snackBar: MatSnackBar
  ) {  }

  enableSwitchControl(){
    //si se ha permitido editar desde el dialog
    if(this.editableState){
      //si no hay otro editando
      if(!this.globalSwitch){
        //activar este control
        this.switchControl = true;
        //avisar a padre que esta activo este control
        this.editableModeEnabled.emit(this.switchControl);
        //llenar el campo con el texto
        this.context.valueControl.setValue(this.context.value);
      } else {
        //si hay otro editando
        this.snackBar.open('Por favor finaliza los cambios antes de iniciar nuevos cambios',undefined,{duration: 2000})
      }
    }
  }

  disableSwitchControl(){
    if(this.globalSwitch){
      this.switchControl = false;
      this.editableModeEnabled.emit(this.switchControl);
    }
  }

  emitValueChange(value: string){
    this.context.value = value;
    this.valueChanged.emit(
      this.context
    );
    this.disableSwitchControl();
  }
}
