import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormControl, Validators } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

import { SecurityService } from '../security/security.service';
import { AppUser } from '../security/app-user';
import { AppUserAuth } from '../security/app-user-auth';
import { PelucheItem } from '../models/pelucheitem';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  title = 'Sesion';
  cssProgress = 'progress-hidden';
  hide = true;
  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  user: AppUser = new AppUser();
  securityObject: AppUserAuth = new AppUserAuth();
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  selectFormControl = new FormControl('', Validators.required);
  toppings = this._formBuilder.group({
    pepperoni: false,
    extracheese: false,
    mushroom: false,
  });

  peluche = new PelucheItem();

  constructor(
    private _formBuilder: FormBuilder,
    private securityService: SecurityService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private titleService: Title,
    public dialog: MatDialog
  ) {
    this.peluche.tipo = 'perro';
    this.peluche.color = 'natural';
  }

  ngOnInit(): void {}

  eligeTipo(event: any) {
    const selectedValue = event.target.value;
    this.peluche.tipo = selectedValue;
  }

  eligeColor(event: any) {
    const selectedValue = event.target.value;
    this.peluche.color = selectedValue;
  }

  eligeBola($event: MatCheckboxChange) {
    if ($event.checked) this.addAccesorio('bola');
    else this.removeAccesorio('bola');
  }
  eligeMartillo($event: MatCheckboxChange) {
    if ($event.checked) this.addAccesorio('martillo');
    else this.removeAccesorio('martillo');
  }
  eligePod($event: MatCheckboxChange) {
    if ($event.checked) this.addAccesorio('pod');
    else this.removeAccesorio('pod');
  }

  addAccesorio(accesorio: string) {
    if (!this.peluche.accesorios.includes(accesorio))
      this.peluche.accesorios.push(accesorio);
    console.log(this.peluche.accesorios);
  }

  removeAccesorio(accesorio: string) {
    if (this.peluche.accesorios.includes(accesorio))
      this.peluche.accesorios.splice(
        this.peluche.accesorios.indexOf(accesorio),
        1
      );
    console.log(this.peluche.accesorios);
  }

  order() {
    this.securityService.order(this.peluche).subscribe(
      (data: string) => {
        console.log(data);
        if (data.length > 0) {
          /*this.router
          .navigateByUrl('/dashboard', { skipLocationChange: true })
          .then(() => {
            this.router.navigate(['/']);
          });*/
          this.openDialog();
        }
      },
      (err: any) => {
        console.log(err.error);
        this.openSnackBar(err.error);
        /*this.openSnackBar(`El usuario ${this.username.value} ya existe`);
        this.cssProgress = 'progress-hidden';*/
      }
    );
  }

  openDialog(): void {
    this.dialog.open(DialogOrderedDialog, {
      width: '350px',
    });
  }

  openSnackBar(text: string) {
    this._snackBar.open(text, 'Ok', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5000,
    });
  }
}

@Component({
  selector: 'dialog-ordered',
  templateUrl: 'dialog-ordered.html',
  viewProviders: [MatIconRegistry],
})
export class DialogOrderedDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOrderedDialog>,
    private router: Router
  ) {}

  gotoKeep() {
    window.location.reload();
  }

  gotoMyPeluches() {
    this.router.navigate(['/mypeluches']);
    this.dialogRef.close();
  }
}
