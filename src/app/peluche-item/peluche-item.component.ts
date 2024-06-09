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
  selector: 'app-peluche-item',
  templateUrl: './peluche-item.component.html',
  styleUrls: ['./peluche-item.component.css'],
})
export class PelucheItemComponent implements OnInit {
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
  carritoStyle = 'carrito';
  favoritoStyle = 'favorito';

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private securityService: SecurityService,
    private router: Router,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const user = this.securityService.userName;
    const id = this.peluche.id;
    const isCarrito = localStorage.getItem('carrito' + user + id);
    if (isCarrito != null) {
      this.carritoStyle = 'carritoUsed';
    } else {
      this.carritoStyle = 'carrito';
    }
    const isFavorito = localStorage.getItem('favorito' + user + id);
    if (isFavorito != null) {
      this.favoritoStyle = 'favoritoUsed';
    } else {
      this.favoritoStyle = 'favorito';
    }

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

  carrito() {
    if (this.securityService.checkAuth()) {
      const user = this.securityService.userName;
      const id = this.peluche.id;
      const isCarrito = localStorage.getItem('carrito' + user + id);
      let badges = localStorage.getItem(user + 'carrito-badge');
      let badgesNumber: number = 0;
      if (badges == null) {
        badges = '0';
      } else {
        badgesNumber = parseInt(badges);
      }
      if (isCarrito != null) {
        badgesNumber--;
        localStorage.setItem(user + 'carrito-badge', badgesNumber.toString());
        localStorage.removeItem('carrito' + user + id);
        this.carritoStyle = 'carrito';
        this.openSnackBarError('Se eliminó el peluche del carrito');
      } else {
        badgesNumber++;
        localStorage.setItem(user + 'carrito-badge', badgesNumber.toString());
        localStorage.setItem('carrito' + user + id, 'true');
        this.carritoStyle = 'carritoUsed';
        this.openSnackBarError('Se agregó el peluche al carrito');
      }
    } else {
      this.openSnackBar();
    }
  }

  favorito() {
    if (this.securityService.checkAuth()) {
      const user = this.securityService.userName;
      const id = this.peluche.id;
      const isCarrito = localStorage.getItem('favorito' + user + id);

      if (isCarrito != null) {
        localStorage.removeItem('favorito' + user + id);
        this.favoritoStyle = 'favorito';
        this.openSnackBarError('Se eliminó el peluche de favoritos');
      } else {
        localStorage.setItem('favorito' + user + id, 'true');
        this.favoritoStyle = 'favoritoUsed';
        this.openSnackBarError('Se agregó el peluche a favoritos');
      }
    } else {
      this.openSnackBar();
    }
  }

  openDialogBuy(): void {
    this.dialog.open(DialogAskDialog, {
      width: '360px',
    });
  }

  buy() {
    if (!this.securityService.checkAuth()) {
      this.openSnackBar();
    } else {
      localStorage.setItem('buy', this.peluche.id);
      this.openDialogBuy();
    }
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

  openSnackBarError(txt: string) {
    this._snackBar.open(txt, 'Ok', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5000,
    });
  }
}

@Component({
  selector: 'dialog-buy',
  templateUrl: 'dialog-buy.html',
  viewProviders: [MatIconRegistry],
})
export class DialogBuyDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogBuyDialog>,
    private router: Router,
    private securityService: SecurityService
  ) {}

  gotoMy() {
    this.router.navigate(['/mypeluches']);
    this.dialogRef.close();
  }

  gotoMarket() {
    window.location.reload();
  }
}

@Component({
  selector: 'dialog-ask',
  templateUrl: 'dialog-ask.html',
  viewProviders: [MatIconRegistry],
})
export class DialogAskDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogAskDialog>,
    private router: Router,
    private securityService: SecurityService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  openDialogBuy(): void {
    this.dialog.open(DialogBuyDialog, {
      width: '360px',
    });
  }

  openSnackBarError(txt: string) {
    this._snackBar.open(txt, 'Ok', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5000,
    });
  }

  buy() {
    let id = localStorage.getItem('buy');
    if (id) {
      this.securityService.buy(id).subscribe(
        (data: string) => {
          this.openDialogBuy();
        },
        (err) => {
          this.openSnackBarError(err.error);
        }
      );
    }
    this.dialogRef.close();
  }

  cancel() {
    this.dialogRef.close();
  }
}
