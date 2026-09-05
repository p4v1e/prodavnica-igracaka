import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { FilterIgracaka, Igracka, Kategorija, PRAZAN_FILTER } from '../../models';
import { IgrackeService, KategorijeService } from '../../services';

// Katalog sa pretragom, filtriranjem i podelom na strane
@Component({
  selector: 'app-katalog',
  templateUrl: './katalog.component.html',
  styleUrls: ['./katalog.component.css']
})
export class KatalogComponent implements OnInit {
  private igrackeServis = inject(IgrackeService);
  private kategorijeServis = inject(KategorijeService);
  private ruta = inject(ActivatedRoute);
  private router = inject(Router);

  filter: FilterIgracaka = { ...PRAZAN_FILTER };
  kategorije: Kategorija[] = [];
  uzrasti = ['0-2', '3-5', '6-8', '9-12'];

  rezultat: Igracka[] = [];
  prikazane: Igracka[] = [];
  ucitavanje = true;

  velicinaStrane = 6;
  trenutnaStrana = 0;

  ngOnInit(): void {
    this.kategorije = this.kategorijeServis.sveSinhrono();

    // Kategorija moze da stigne kao parametar rute sa pocetne strane
    this.ruta.queryParams.subscribe(parametri => {
      this.filter = { ...PRAZAN_FILTER };
      if (parametri['kategorija']) {
        this.filter.kategorijaId = Number(parametri['kategorija']);
      }
      this.pretrazi();
    });
  }

  pretrazi(): void {
    this.ucitavanje = true;
    this.igrackeServis.pretrazi(this.filter).subscribe(lista => {
      this.rezultat = lista;
      this.trenutnaStrana = 0;
      this.osveziStranu();
      this.ucitavanje = false;
    });
  }

  ponisti(): void {
    this.filter = { ...PRAZAN_FILTER };
    this.router.navigate(['/katalog']);
  }

  promenaStrane(dogadjaj: PageEvent): void {
    this.trenutnaStrana = dogadjaj.pageIndex;
    this.velicinaStrane = dogadjaj.pageSize;
    this.osveziStranu();
  }

  private osveziStranu(): void {
    const pocetak = this.trenutnaStrana * this.velicinaStrane;
    this.prikazane = this.rezultat.slice(pocetak, pocetak + this.velicinaStrane);
  }
}
