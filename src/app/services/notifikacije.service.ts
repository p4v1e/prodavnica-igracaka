import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * Servis za kratke poruke korisniku (Angular Material Snackbar).
 */
@Injectable({ providedIn: 'root' })
export class NotifikacijeService {

  constructor(private snackBar: MatSnackBar) {}

  uspeh(poruka: string): void { this.prikazi(poruka, 'snack-uspeh'); }
  greska(poruka: string): void { this.prikazi(poruka, 'snack-greska'); }
  info(poruka: string): void { this.prikazi(poruka, 'snack-info'); }

  private prikazi(poruka: string, klasa: string): void {
    this.snackBar.open(poruka, 'U redu', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: [klasa]
    });
  }
}
