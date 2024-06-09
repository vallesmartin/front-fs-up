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

import { AppUser } from './app-user';
import { AppUserAuth } from './app-user-auth';
import { SecurityService } from './security.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @Output() loggedIn = new EventEmitter<string>();

  title = 'Sesion';
  cssProgress = 'progress-hidden';
  hide = true;
  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  user: AppUser = new AppUser();
  securityObject: AppUserAuth = new AppUserAuth();
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private securityService: SecurityService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private titleService: Title
  ) {
    this.titleService.setTitle(this.title);
  }

  ngOnInit(): void {}

  login() {
    //this.cssProgress = 'progress';
    this.user.email = this.username.value;
    this.user.password = this.password.value;
    this.securityService.login(this.user).subscribe(
      (data: string) => {
        console.log(data);
        if (data.length > 0) {
          localStorage.setItem('user', this.username.value);
          this.securityService.userName = this.username.value;
          localStorage.setItem('bearerToken', data);
          this.cssProgress = 'progress-hidden';
          this.loggedIn.emit(this.username.value);
          this.router
            .navigateByUrl('/dashboard', { skipLocationChange: true })
            .then(() => {
              this.router.navigate(['/']);
            });
        }
      },
      (err) => {
        console.log(err);
        this.openSnackBar();
        this.cssProgress = 'progress-hidden';
      }
    );
  }

  logout() {
    this.securityService.logout();
    this.router.navigate(['/login']);
  }

  isUserValid(): boolean {
    return this.securityService.checkAuth();
  }

  openSnackBar() {
    this._snackBar.open('Inicio de sesion incorrecto', 'Ok', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000,
    });
  }
}
