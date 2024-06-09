import { Component, Input, OnInit } from '@angular/core';
import { PelucheItem } from '../models/pelucheitem';
import { SecurityService } from '../security/security.service';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatIconRegistry } from '@angular/material/icon';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-peluche-my',
  templateUrl: './peluche-my.component.html',
  styleUrls: ['./peluche-my.component.css'],
})
export class PelucheMyComponent implements OnInit {
  sell() {
    localStorage.setItem('sell', this.peluche.id);
    this.openDialogSell();
  }
  unsell() {
    localStorage.setItem('unsell', this.peluche.id);
    this.openDialogUnsell();
  }
  delete() {
    localStorage.setItem('delete', this.peluche.id);
    this.openDialogDelete();
  }
  @Input()
  peluche: PelucheItem = new PelucheItem();
  imagen: string = '';
  colorImage = '';
  isColor = false;
  isBola = false;
  isMartillo = false;
  isPod = false;
  bola = '';
  martillo = '';
  pod = '';

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private securityService: SecurityService,
    private router: Router,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

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

  setSale() {}

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

  openSnackBar() {
    if (!this.securityService.checkAuth()) {
      this._snackBar.open('Debe iniciar sesón para realizar la acción', 'Ok', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 5000,
      });
    }
  }

  openDialogDelete(): void {
    this.dialog.open(DialogDeleteDialog, {
      width: '310px',
    });
  }

  openDialogSell(): void {
    this.dialog.open(DialogSellDialog, {
      width: '310px',
    });
  }

  openDialogUnsell(): void {
    this.dialog.open(DialogUnsellDialog, {
      width: '310px',
    });
  }
}

@Component({
  selector: 'dialog-unsell',
  templateUrl: 'dialog-unsell.html',
  viewProviders: [MatIconRegistry],
})
export class DialogUnsellDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogUnsellDialog>,
    private router: Router,
    private securityService: SecurityService
  ) {}

  unsell() {
    let id = localStorage.getItem('sell');
    if (id) {
      this.securityService.setSale(id, false).subscribe(
        (data: string) => {
          console.log(data);
          window.location.reload();
        },
        (err) => {
          console.log(err);
          window.location.reload();
        }
      );
    }

    this.dialogRef.close();
  }

  cancel() {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'dialog-sell',
  templateUrl: 'dialog-sell.html',
  viewProviders: [MatIconRegistry],
})
export class DialogSellDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogSellDialog>,
    private router: Router,
    private securityService: SecurityService
  ) {}

  sell() {
    let id = localStorage.getItem('sell');
    if (id) {
      this.securityService.setSale(id, true).subscribe(
        (data: string) => {
          console.log(data);
          window.location.reload();
        },
        (err) => {
          console.log(err);
          window.location.reload();
        }
      );
    }

    this.dialogRef.close();
  }

  cancel() {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'dialog-delete',
  templateUrl: 'dialog-delete.html',
  viewProviders: [MatIconRegistry],
})
export class DialogDeleteDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogDeleteDialog>,
    private router: Router,
    private securityService: SecurityService
  ) {}

  deleteOption() {
    let id = localStorage.getItem('delete');
    if (id) {
      this.securityService.delete(id).subscribe(
        (data: string) => {
          console.log(data);
          window.location.reload();
        },
        (err) => {
          console.log(err);
          window.location.reload();
        }
      );
    }

    this.dialogRef.close();
  }

  cancel() {
    this.dialogRef.close();
  }
}
