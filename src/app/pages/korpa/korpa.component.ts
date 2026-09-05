import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { KorpaService, NotifikacijeService } from '../../services';
import { PotvrdaDijalogComponent } from '../../shared/potvrda-dijalog/potvrda-dijalog.component';

// Prikaz i izmena sadrzaja korpe
@Component({
  selector: 'app-korpa',
  templateUrl: './korpa.component.html',
  styleUrls: ['./korpa.component.css']
})
export class KorpaComponent {
  private korpaServis = inject(KorpaService);
  private dijalog = inject(MatDialog);
  private poruke = inject(NotifikacijeService);
  private router = inject(Router);

  stanje$ = this.korpaServis.stanje$;
  kolone = ['artikal', 'cena', 'kolicina', 'iznos', 'akcije'];

  izmeniKolicinu(igrackaId: number, kolicina: number): void {
    this.korpaServis.izmeniKolicinu(igrackaId, kolicina);
  }

  ukloni(igrackaId: number): void {
    this.korpaServis.ukloni(igrackaId);
    this.poruke.info('Artikal je uklonjen iz korpe.');
  }

  isprazni(): void {
    const dijalogRef = this.dijalog.open(PotvrdaDijalogComponent, {
      data: { naslov: 'Praznjenje korpe', poruka: 'Da li zelite da uklonite sve artikle iz korpe?' },
      width: '400px'
    });
    dijalogRef.afterClosed().subscribe(potvrdjeno => {
      if (potvrdjeno) {
        this.korpaServis.isprazni();
        this.poruke.info('Korpa je ispraznjena.');
      }
    });
  }

  naNaplatu(): void {
    this.router.navigate(['/placanje']);
  }
}
