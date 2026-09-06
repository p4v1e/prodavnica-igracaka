import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Porudzbina } from '../../../models/porudzbina.model';
import { NotifikacijeService } from '../../../services/notifikacije.service';
import { PorudzbineService } from '../../../services/porudzbine.service';
import { PotvrdaDijalogComponent } from '../../../shared/potvrda-dijalog/potvrda-dijalog.component';

// Pregled porudzbina i promena statusa obrade
@Component({
  selector: 'app-admin-porudzbine',
  templateUrl: './admin-porudzbine.component.html',
  styleUrls: ['./admin-porudzbine.component.css']
})
export class AdminPorudzbineComponent implements OnInit {

  svePorudzbine: Porudzbina[] = [];
  prikazane: Porudzbina[] = [];
  izabranStatus = 'sve';
  detalji?: Porudzbina;

  statusi = this.porudzbineServis.statusi;
  kolone = ['broj', 'kupac', 'datum', 'iznos', 'placanje', 'status', 'akcije'];

  constructor(private porudzbineServis: PorudzbineService,
              private dijalog: MatDialog,
              private poruke: NotifikacijeService) {}

  ngOnInit(): void {
    this.porudzbineServis.porudzbine$.subscribe(lista => {
      this.svePorudzbine = lista;
      this.filtriraj();
    });
  }

  // TODO: dodati poruku kad nema nijedne porudzbine
  filtriraj(): void {
    if (this.izabranStatus === 'sve') {
      this.prikazane = this.svePorudzbine;
    } else {
      this.prikazane = this.svePorudzbine.filter(p => p.status === this.izabranStatus);
    }
  }

  prikaziDetalje(p: Porudzbina): void {
    this.detalji = p;
  }

  promeniStatus(p: Porudzbina, status: string): void {
    this.porudzbineServis.promeniStatus(p.id, status).subscribe(() =>
      this.poruke.uspeh('Status porudzbine je promenjen.'));
  }

  obrisi(p: Porudzbina): void {
    const dijalogRef = this.dijalog.open(PotvrdaDijalogComponent, {
      data: { naslov: 'Brisanje porudzbine', poruka: 'Obrisati porudzbinu ' + p.broj + '?' },
      width: '400px'
    });
    dijalogRef.afterClosed().subscribe(potvrdjeno => {
      if (potvrdjeno) {
        this.detalji = undefined;
        this.porudzbineServis.obrisi(p.id).subscribe(() => this.poruke.uspeh('Porudzbina je obrisana.'));
      }
    });
  }
}
