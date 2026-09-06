import { Component, OnInit } from '@angular/core';
import { Igracka } from '../../models/igracka.model';
import { Kategorija } from '../../models/kategorija.model';
import { IgrackeService } from '../../services/igracke.service';
import { KategorijeService } from '../../services/kategorije.service';

@Component({
  selector: 'app-pocetna',
  templateUrl: './pocetna.component.html',
  styleUrls: ['./pocetna.component.css']
})
export class PocetnaComponent implements OnInit {

  kategorije: Kategorija[] = [];
  izdvojene: Igracka[] = [];
  ucitavanje = true;

  constructor(private igrackeServis: IgrackeService, private kategorijeServis: KategorijeService) {}

  ngOnInit(): void {
    this.kategorijeServis.sve().subscribe(lista => this.kategorije = lista);
    this.igrackeServis.izdvojene().subscribe(lista => {
      this.izdvojene = lista;
      this.ucitavanje = false;
    });
  }
}
