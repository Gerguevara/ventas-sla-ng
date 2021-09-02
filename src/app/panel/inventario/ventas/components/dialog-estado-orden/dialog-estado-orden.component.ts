import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'sla-dialog-estado-orden',
  templateUrl: './dialog-estado-orden.component.html',
  styleUrls: ['./dialog-estado-orden.component.scss']
})
export class DialogEstadoOrdenComponent implements OnInit {

  @ViewChild('picker2') picker: any;

  public disabled = false;
  public showSpinners = true;
  public showSeconds = false;
  public touchUi = false;
  public enableMeridian = false;
  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;
  public color: ThemePalette = 'primary';
  public dateControl = new FormControl(new Date(2021,9,4,5,6,7));

  constructor() { }

  ngOnInit(): void {
  }

}
