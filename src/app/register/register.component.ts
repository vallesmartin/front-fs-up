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
import { AppUser } from '../security/app-user';
import { AppUserAuth } from '../security/app-user-auth';
import { SecurityService } from '../security/security.service';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatIcon, MatIconRegistry } from '@angular/material/icon';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  title = 'Sesion';
  cssProgress = 'progress-hidden';
  hide = true;
  name = new FormControl('', [Validators.required]);
  lastname = new FormControl('', [Validators.required]);
  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  password2 = new FormControl('', [Validators.required]);
  user: AppUser = new AppUser();
  securityObject: AppUserAuth = new AppUserAuth();
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  reg = true;

  constructor(
    private securityService: SecurityService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private titleService: Title,
    public dialog: MatDialog
  ) {
    this.titleService.setTitle(this.title);
  }

  ngOnInit(): void {}

  register() {
    //this.cssProgress = 'progress';
    this.user.nombre = this.name.value;
    this.user.apellido = this.lastname.value;
    this.user.email = this.username.value;
    this.user.password = this.password.value;

    if (this.password.value != this.password2.value) {
      this.openSnackBar(`Las contraseñas no coinciden`);
      this.cssProgress = 'progress-hidden';
    } else {
      this.securityService.register(this.user).subscribe(
        (data: string) => {
          console.log(data);
          if (data.length > 0) {
            /*this.router
            .navigateByUrl('/dashboard', { skipLocationChange: true })
            .then(() => {
              this.router.navigate(['/']);
            });*/
            this.reg = false;
            this.openDialog();
            this.cssProgress = 'progress-hidden';
          }
        },
        (err: any) => {
          this.openSnackBar(`El usuario ${this.username.value} ya existe`);
          this.cssProgress = 'progress-hidden';
        }
      );
    }
  }

  logout() {
    this.securityService.logout();
    this.router.navigate(['/login']);
  }

  isUserValid(): boolean {
    return this.securityService.checkAuth();
  }

  openSnackBar(text: string) {
    this._snackBar.open(text, 'Ok', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000,
    });
  }

  openDialog(): void {
    this.dialog.open(DialogRegisteredDialog, {
      width: '310px',
    });
  }
}

@Component({
  selector: 'dialog-registered',
  templateUrl: 'dialog-registered.html',
  viewProviders: [MatIconRegistry],
})
export class DialogRegisteredDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogRegisteredDialog>,
    private router: Router
  ) {}

  gotoLogin() {
    this.router.navigate(['/login']);
    this.dialogRef.close();
  }

  gotoDashboard() {
    this.router.navigate(['/dashboard']);
    this.dialogRef.close();
  }
}
