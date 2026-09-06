import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Korisnik } from '../../../models/korisnik.model';
import { AuthService } from '../../../services/auth.service';
import { NotifikacijeService } from '../../../services/notifikacije.service';
import { PotvrdaDijalogComponent } from '../../../shared/potvrda-dijalog/potvrda-dijalog.component';

@Component({
  selector: 'app-admin-korisnici',
  templateUrl: './admin-korisnici.component.html',
  styleUrls: ['./admin-korisnici.component.css']
})
export class AdminKorisniciComponent implements OnInit {

  korisnici: Korisnik[] = [];
  kolone = ['ime', 'email', 'telefon', 'grad', 'uloga', 'akcije'];

  constructor(private auth: AuthService, private dijalog: MatDialog, private poruke: NotifikacijeService) {}

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
