import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Igracka } from '../../../models';
import { IgrackeService, KategorijeService, NotifikacijeService } from '../../../services';
import { PotvrdaDijalogComponent } from '../../../shared/potvrda-dijalog/potvrda-dijalog.component';
import { IgrackaFormaComponent } from './igracka-forma/igracka-forma.component';

// Pregled asortimana sa unosom, izmenom i brisanjem artikala
@Component({
  selector: 'app-admin-igracke',
  templateUrl: './admin-igracke.component.html',
  styleUrls: ['./admin-igracke.component.css']
})
export class AdminIgrackeComponent implements OnInit {
  private igrackeServis = inject(IgrackeService);
  private kategorijeServis = inject(KategorijeService);
  private dijalog = inject(MatDialog);
  private poruke = inject(NotifikacijeService);

  izvorPodataka = new MatTableDataSource<Igracka>([]);
  kolone = ['sifra', 'naziv', 'kategorija', 'cena', 'zalihe', 'akcije'];

  ngOnInit(): void {
    this.igrackeServis.igracke$.subscribe(lista => this.izvorPodataka.data = lista);
  }

  filtriraj(dogadjaj: Event): void {
    const vrednost = (dogadjaj.target as HTMLInputElement).value;
    this.izvorPodataka.filter = vrednost.trim().toLowerCase();
  }

  nazivKategorije(id: number): string {
    return this.kategorijeServis.naziv(id);
  }

  dodaj(): void {
    const dijalogRef = this.dijalog.open(IgrackaFormaComponent, { data: {}, width: '500px' });
    dijalogRef.afterClosed().subscribe(rezultat => {
      if (rezultat) {
        this.poruke.uspeh('Artikal je dodat.');
      }
    });
  }

  izmeni(igracka: Igracka): void {
    const dijalogRef = this.dijalog.open(IgrackaFormaComponent, {
      data: { igracka: igracka },
      width: '500px'
    });
    dijalogRef.afterClosed().subscribe(rezultat => {
      if (rezultat) {
        this.poruke.uspeh('Podaci su izmenjeni.');
      }
    });
  }

  obrisi(igracka: Igracka): void {
    const dijalogRef = this.dijalog.open(PotvrdaDijalogComponent, {
      data: { naslov: 'Brisanje artikla', poruka: 'Obrisati artikal ' + igracka.naziv + '?' },
      width: '400px'
    });
    dijalogRef.afterClosed().subscribe(potvrdjeno => {
      if (potvrdjeno) {
        this.igrackeServis.obrisi(igracka.id).subscribe(() => this.poruke.uspeh('Artikal je obrisan.'));
      }
    });
  }
}
