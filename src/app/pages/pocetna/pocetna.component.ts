import { Component, OnInit, inject } from '@angular/core';
import { Igracka, Kategorija } from '../../models';
import { IgrackeService, KategorijeService } from '../../services';

// Pocetna strana: kategorije i izdvojene igracke
@Component({
  selector: 'app-pocetna',
  templateUrl: './pocetna.component.html',
  styleUrls: ['./pocetna.component.css']
})
export class PocetnaComponent implements OnInit {
  private igrackeServis = inject(IgrackeService);
  private kategorijeServis = inject(KategorijeService);

  kategorije: Kategorija[] = [];
  izdvojene: Igracka[] = [];
  ucitavanje = true;

  ngOnInit(): void {
    this.kategorijeServis.sve().subscribe(lista => this.kategorije = lista);
    this.igrackeServis.izdvojene().subscribe(lista => {
      this.izdvojene = lista;
      this.ucitavanje = false;
    });
  }
}
