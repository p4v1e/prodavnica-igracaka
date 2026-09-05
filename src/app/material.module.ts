import { NgModule } from '@angular/core';

// Angular Material komponente koje aplikacija koristi
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatStepperModule } from '@angular/material/stepper';
import { MatBadgeModule } from '@angular/material/badge';

const MODULI = [
  MatToolbarModule, MatButtonModule, MatIconModule, MatCardModule,
  MatInputModule, MatFormFieldModule, MatSelectModule, MatCheckboxModule,
  MatRadioModule, MatTableModule, MatPaginatorModule, MatDialogModule,
  MatSnackBarModule, MatMenuModule, MatTabsModule, MatStepperModule,
  MatBadgeModule
];

@NgModule({
  imports: MODULI,
  exports: MODULI
})
export class MaterialModule {}
