import { Component, Input, OnInit } from '@angular/core';
import { PelucheTop } from '../models/peluchetop';

@Component({
  selector: 'app-peluche-top',
  templateUrl: './peluche-top.component.html',
  styleUrls: ['./peluche-top.component.css'],
})
export class PelucheTopComponent implements OnInit {
  @Input()
  peluche: PelucheTop = new PelucheTop();

  constructor() {}

  ngOnInit(): void {}
}
