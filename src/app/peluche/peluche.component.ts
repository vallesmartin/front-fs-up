import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { PelucheItem } from '../models/pelucheitem';

@Component({
  selector: 'app-peluche',
  templateUrl: './peluche.component.html',
  styleUrls: ['./peluche.component.css'],
})
export class PelucheComponent implements OnInit, OnChanges {
  @Input()
  peluche: PelucheItem = new PelucheItem();
  colorImage = '';
  isColor = false;
  isBola = false;
  isMartillo = false;
  isPod = false;
  bola = '';
  martillo = '';
  pod = '';

  constructor() {}

  ngOnInit(): void {
    let tipo: string | null = null;
    let color: string | null = null;
    let accesorios: Array<string> | null = null;

    setInterval(() => {
      this.peluche.Image = this.getImageFromType(this.peluche.tipo);
      this.colorImage = this.getColorFromType(
        this.peluche.color,
        this.peluche.tipo
      );
      this.bola = this.getImageFromAccesory('bola');
      this.martillo = this.getImageFromAccesory('martillo');
      this.pod = this.getImageFromAccesory('pod');
    }, 100);
  }
  getImageFromAccesory(acc: string): string {
    switch (acc) {
      case 'bola':
        if (this.peluche.accesorios.includes(acc)) {
          this.isBola = true;
          return '../../assets/bola.png';
        } else {
          this.isBola = false;
          break;
        }
      case 'pod':
        if (this.peluche.accesorios.includes(acc)) {
          this.isPod = true;
          return '../../assets/pod.png';
        } else {
          this.isPod = false;
          break;
        }

      case 'martillo':
        if (this.peluche.accesorios.includes(acc)) {
          this.isMartillo = true;
          return '../../assets/martillo.png';
        } else {
          this.isMartillo = false;
          break;
        }
    }
    return '';
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes.peluche.currentValue);
    // Detectar cambios en el valor de entrada
    if (changes.valorInput) {
      // Realizar acciones cuando el valor cambia
      console.log(
        'Valor cambiado en el hijo:',
        changes.valorInput.currentValue
      );
    }
  }

  getImageFromType(type: string): string {
    const image: string = '';
    switch (type) {
      case 'perro':
        return '../../assets/perro.png';
      case 'gato':
        return '../../assets/gato.png';
      case 'mapache':
        return '../../assets/mapache.png';
      case 'oso':
        return '../../assets/oso.png';
      case 'conejo':
        return '../../assets/conejo.png';
      default:
        return '../../assets/perro.png';
    }
  }

  getColorFromType(color: string, type: string): string {
    this.isColor = true;
    const image: string = '';
    switch (color) {
      case 'verde':
        return '../../assets/v-' + type + '.png';
      case 'azul':
        return '../../assets/a-' + type + '.png';
      case 'rosa':
        return '../../assets/r-' + type + '.png';
      case 'amarillo':
        return '../../assets/am-' + type + '.png';
      default:
        this.isColor = false;
        return '';
    }
  }
}
