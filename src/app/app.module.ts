import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import localeEs from '@angular/common/locales/es';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeEs, 'es');

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { A11yModule } from '@angular/cdk/a11y';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { OverlayModule } from '@angular/cdk/overlay';
import { OverlayContainer } from '@angular/cdk/overlay';
import { MatTableExporterModule } from 'mat-table-exporter';

import { SecurityService } from './security/security.service';
import { ThemeService, AppThemes } from './theme.service';
import { LoginComponent } from './security/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginDataComponent } from './security/login-data/login-data.component';
import { PelucheTopComponent } from './peluche-top/peluche-top.component';
import { PelucheItemComponent } from './peluche-item/peluche-item.component';
import {
  DialogRegisteredDialog,
  RegisterComponent,
} from './register/register.component';
import {
  DialogEmptyMyPeluchesDialog,
  MypeluchesComponent,
} from './mypeluches/mypeluches.component';
import { PelucheComponent } from './peluche/peluche.component';
import { OrderComponent } from './order/order.component';
import { MatIcon } from '@angular/material/icon';
import { PelucheMyComponent } from './peluche-my/peluche-my.component';
import { DialogOrderedDialog } from './order/order.component';
import { DialogDeleteDialog } from './peluche-my/peluche-my.component';
import { DialogSellDialog } from './peluche-my/peluche-my.component';
import { DialogUnsellDialog } from './peluche-my/peluche-my.component';
import { DialogBuyDialog } from './peluche-item/peluche-item.component';
import { DialogAskDialog } from './peluche-item/peluche-item.component';

@NgModule({
  declarations: [
    DialogAskDialog,
    DialogBuyDialog,
    DialogDeleteDialog,
    DialogSellDialog,
    DialogUnsellDialog,
    AppComponent,
    LoginComponent,
    DashboardComponent,
    LoginDataComponent,
    PelucheTopComponent,
    PelucheItemComponent,
    RegisterComponent,
    MypeluchesComponent,
    PelucheComponent,
    OrderComponent,
    DialogRegisteredDialog,
    DialogOrderedDialog,
    PelucheMyComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    A11yModule,
    ClipboardModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    OverlayModule,
    MatTableExporterModule,
    PortalModule,
    ScrollingModule,
  ],
  providers: [SecurityService, { provide: LOCALE_ID, useValue: 'en-US' }],
  entryComponents: [MatDialogModule],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(
    overlayContainer: OverlayContainer,
    private themeService: ThemeService
  ) {
    /*themeService.getTheme().subscribe(data => {
        if (data === AppThemes.light) overlayContainer.getContainerElement().classList.remove(AppThemes.dark);
        else overlayContainer.getContainerElement().classList.add(AppThemes.dark);
      });*/
    //overlayContainer.getContainerElement().classList.add('purple-green');
  }
}
