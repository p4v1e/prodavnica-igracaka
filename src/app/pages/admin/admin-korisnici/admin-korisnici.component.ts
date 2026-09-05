import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Korisnik } from '../../../models';
import { AuthService, NotifikacijeService } from '../../../services';
import { PotvrdaDijalogComponent } from '../../../shared/potvrda-dijalog/potvrda-dijalog.component';

// Pregled registrovanih korisnika
@Component({
  selector: 'app-admin-korisnici',
  templateUrl: './admin-korisnici.component.html',
  styleUrls: ['./admin-korisnici.component.css']
})
export class AdminKorisniciComponent implements OnInit {
  private auth = inject(AuthService);
  private dijalog = inject(MatDialog);
  private poruke = inject(NotifikacijeService);

  korisnici: Korisnik[] = [];
  kolone = ['ime', 'email', 'telefon', 'grad', 'uloga', 'akcije'];

  ngOnInit(): void {
    this.auth.korisnici$.subscribe(lista => this.korisnici = lista);
  }

  obrisi(k: Korisnik): void {
    if (k.uloga === 'administrator') {
      this.poruke.greska('Administratorski nalog ne moze da se obrise.');
      return;
    }

    const dijalogRef = this.dijalog.open(PotvrdaDijalogComponent, {
      data: { naslov: 'Brisanje naloga', poruka: 'Obrisati nalog korisnika ' + k.email + '?' },
      width: '400px'
    });
    dijalogRef.afterClosed().subscribe(potvrdjeno => {
      if (potvrdjeno) {
        this.auth.obrisiKorisnika(k.id).subscribe(() => this.poruke.uspeh('Nalog je obrisan.'));
      }
    });
  }
}
