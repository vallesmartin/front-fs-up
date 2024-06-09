import {
  Component,
  HostBinding,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { SecurityService } from './security/security.service';
import { AppUserRole } from './security/app-user-role';
import { LoginComponent } from './security/login.component';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  badgeStr: string | number | null | undefined;
  badge: number = 0;
  irSignIn() {
    this.router.navigate(['/register']);
  }
  irLogin() {
    this.router.navigate(['/login']);
  }
  title = 'Andromeda';
  role: AppUserRole = new AppUserRole();
  isAuth: boolean = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  public userName: string | null = '';

  @HostBinding('class') componentCssClass: any;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private securityService: SecurityService,
    private router: Router,
    private titleService: Title,
    private overlay: OverlayContainer,
    private _snackBar: MatSnackBar,
    public overlayContainer: OverlayContainer
  ) {
    this.titleService.setTitle(this.title);
    this.securityService.checkAuth();
  }

  @HostBinding('class') className = '';

  public onSetTheme(e: string) {
    this.overlayContainer.getContainerElement().classList.add(e);
    this.componentCssClass = e;
  }

  ngOnInit(): void {
    console.log('aparece app.component');

    this.chkTheme();

    setInterval(() => {
      this.userName = this.securityService.userName;
      this.badgeStr = localStorage.getItem(this.userName + 'carrito-badge');
      if (this.badgeStr == '0' || this.badgeStr == null) {
        localStorage.removeItem(this.userName + 'carrito-badge');
        this.badge = 0;
      } else {
        this.badge = parseInt(this.badgeStr);
      }
    }, 100);
  }

  ngOnChange(): void {}

  isUserValid(): boolean {
    return this.securityService.checkAuth();
  }

  chkTheme() {
    const darkClassName = 'darkMode';
    const lightClassName = 'lightMode';
    var themeClass = localStorage.getItem('theme');
    if (themeClass == lightClassName) {
      this.document.body.style.backgroundColor = 'white';
      this.document.body.classList.remove(darkClassName);
      localStorage.setItem('theme', lightClassName);
    } else {
      this.document.body.style.backgroundColor = '#000000de';
      this.document.body.classList.add(darkClassName);
      localStorage.setItem('theme', darkClassName);
    }
  }

  toggleThemeMode() {
    const darkClassName = 'darkMode';
    const lightClassName = 'lightMode';
    var themeClass = localStorage.getItem('theme');
    console.log(themeClass);
    if (themeClass != lightClassName) {
      this.document.body.style.backgroundColor = 'white';
      this.document.body.classList.remove(darkClassName);
      localStorage.setItem('theme', lightClassName);
    } else {
      this.document.body.style.backgroundColor = '#000000de';
      this.document.body.classList.add(darkClassName);
      localStorage.setItem('theme', darkClassName);
    }
  }

  gotoMy() {
    this.router.navigate(['/mypeluches']);
  }

  logout() {
    localStorage.removeItem('theme');
    this.userName = '';
    this.securityService.logout();
    this.router.navigate(['/dashboard']);
  }

  openSnackBar(text: string) {
    this._snackBar.open(text, 'Ok', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000,
    });
  }
}
