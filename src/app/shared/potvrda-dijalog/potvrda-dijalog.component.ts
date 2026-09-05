import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

// Podaci koji se prosledjuju dijalogu
export interface PodaciPotvrde {
  naslov: string;
  poruka: string;
}

// Dijalog za potvrdu brisanja i slicnih akcija
@Component({
  selector: 'app-potvrda-dijalog',
  templateUrl: './potvrda-dijalog.component.html'
})
export class PotvrdaDijalogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public podaci: PodaciPotvrde) {}
}
