import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { PelucheItem } from '../models/pelucheitem';
import { SecurityService } from '../security/security.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconRegistry } from '@angular/material/icon';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-mypeluches',
  templateUrl: './mypeluches.component.html',
  styleUrls: ['./mypeluches.component.css'],
})
export class MypeluchesComponent implements OnInit {
  pageIndex = 0;
  pagIndice = 1;
  pagLength = 0;
  cantidad = 0;

  misPeluches = new Array<PelucheItem>();
  cssProgress: string = '';

  constructor(
    private securityService: SecurityService,
    private router: Router,
    private titleService: Title,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getMyTotal();
    this.getMyPeluches();
  }

  getMyTotal() {
    this.securityService.getTotalMy().subscribe(
      (data: number) => {
        this.cantidad = data;
        this.pagLength = this.cantidad;
        console.log(data);
        if (this.cantidad == 0) {
          this.openDialog();
        }
      },
      (err) => {
        this.openDialog();
        this.cssProgress = 'progress-hidden';
      }
    );
  }

  getMyPeluches() {
    this.securityService.getAllByUser(this.pageIndex, this.pagLength).subscribe(
      (data: Array<PelucheItem>) => {
        console.log(data);
        this.misPeluches = data;
        console.log();
      },
      (err) => {
        console.log(err);
        this.cssProgress = 'progress-hidden';
      }
    );
  }

  handlePageEvent($event: PageEvent) {
    this.pageIndex = $event.pageIndex;
    console.log($event.pageIndex);
    this.misPeluches = new Array<PelucheItem>();
    this.getMyPeluches();
  }

  openDialog(): void {
    this.dialog.open(DialogEmptyMyPeluchesDialog, {
      width: '310px',
    });
  }
}

@Component({
  selector: 'dialog-empty-mypeluches',
  templateUrl: 'dialog-empty-mypeluches.html',
  viewProviders: [MatIconRegistry],
})
export class DialogEmptyMyPeluchesDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogEmptyMyPeluchesDialog>,
    private router: Router
  ) {}

  gotoOrder() {
    this.router.navigate(['/order']);
    this.dialogRef.close();
  }

  gotoDashboard() {
    this.router.navigate(['/dashboard']);
    this.dialogRef.close();
  }
}
