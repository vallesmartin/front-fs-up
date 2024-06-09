import { Component, OnInit, ViewChild } from '@angular/core';
import { SecurityService } from '../security/security.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Observable, Subscription, interval } from 'rxjs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { PelucheTop } from '../models/peluchetop';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PelucheItem } from '../models/pelucheitem';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

export interface Tile {
  image: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  title = 'Peluche Marketplace';
  cssProgress = 'progress';
  isSmallScreen: boolean = false;
  isOrderSession = true;
  peluche1: PelucheTop = new PelucheTop();
  peluche2: PelucheTop = new PelucheTop();
  peluche3: PelucheTop = new PelucheTop();

  pelucheItem = new PelucheItem();
  pelucheItem2 = new PelucheItem();
  peluches = new Array();
  peluchesVenta = new Array<PelucheItem>();

  cantidad = 0;

  pageIndex = 0;
  pagIndice = 1;
  pagLength = 10;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private securityService: SecurityService,
    private router: Router,
    private titleService: Title,
    private _snackBar: MatSnackBar
  ) {
    this.titleService.setTitle(this.title);
  }

  ngOnInit(): void {
    this.getTotalSales();
    this.setSales();
    this.setPelucheTopData();
    this.getPaginationData();

    this.cssProgress = 'progress-hidden';
  }

  getTotalSales() {
    this.securityService.getTotalSale().subscribe(
      (data: number) => {
        this.cantidad = data;
        this.pagLength = this.cantidad;
      },
      (err) => {
        console.log(err);
        this.cssProgress = 'progress-hidden';
      }
    );
  }

  setSales() {
    this.securityService.getSales(this.pageIndex, this.pagLength).subscribe(
      (data: Array<PelucheItem>) => {
        console.log(data);
        this.peluchesVenta = data;
        console.log();
      },
      (err) => {
        console.log(err);
        this.cssProgress = 'progress-hidden';
      }
    );
  }

  setPelucheTopData() {
    this.securityService.getTop().subscribe(
      (data: Array<PelucheTop>) => {
        this.peluche1 = data[0];
        this.peluche1.Image = this.getImageFromType(this.peluche1.tipo);
        this.peluche1.Ribbon = '../../assets/1.png';
        this.peluche2 = data[1];
        this.peluche2.Image = this.getImageFromType(this.peluche2.tipo);
        this.peluche2.Ribbon = '../../assets/2.png';
        this.peluche3 = data[2];
        this.peluche3.Image = this.getImageFromType(this.peluche3.tipo);
        this.peluche3.Ribbon = '../../assets/3.png';
      },
      (err) => {
        console.log(err);
        this.cssProgress = 'progress-hidden';
      }
    );
  }

  getPaginationData() {
    this.pagLength = this.cantidad;
  }

  handlePageEvent($event: PageEvent) {
    this.pageIndex = $event.pageIndex;
    console.log($event.pageIndex);
    this.peluchesVenta = new Array<PelucheItem>();
    this.setSales();
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

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  ngAfterViewInit() {}
  ngOnChange() {}
  order() {
    if (!this.securityService.checkAuth()) {
      this.openSnackBar('Para personalizar un peluche debes iniciar sesión');
    } else {
      if (this.securityService.checkAuth()) {
        this.router.navigate(['/order']);
      } else {
        this.isOrderSession = false;
      }
    }
  }

  openSnackBar(text: string) {
    if (!this.securityService.checkAuth()) {
      this._snackBar.open(text, 'Ok', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 5000,
      });
    }
  }
}
