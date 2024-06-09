import { newArray } from '@angular/compiler/src/util';

export class PelucheItem {
  id: string = '';
  email: string = '';
  tipo: string = '';
  color: string = '';
  accesorios: string[] = new Array();
  venta: boolean = false;
  Image: string = '';
}
