import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Igracka } from '../../models/igracka.model';
import { IgrackeService } from '../../services/igracke.service';
import { KategorijeService } from '../../services/kategorije.service';
import { KorpaService } from '../../services/korpa.service';
import { NotifikacijeService } from '../../services/notifikacije.service';

// Prikaz podataka o izabranoj igracki i dodavanje u korpu
@Component({
  selector: 'app-detalji-igracke',
  templateUrl: './detalji-igracke.component.html',
  styleUrls: ['./detalji-igracke.component.css']
})
export class DetaljiIgrackeComponent implements OnInit {

  igracka?: Igracka;
  kolicina = 1;
  ucitavanje = true;

  constructor(private ruta: ActivatedRoute,
              private router: Router,
              private igrackeServis: IgrackeService,
              private kategorijeServis: KategorijeService,
              private korpa: KorpaService,
              private poruke: NotifikacijeService) {}

  ngOnInit(): void {
    const id = Number(this.ruta.snapshot.paramMap.get('id'));
    this.igrackeServis.jedna(id).subscribe(nadjena => {
      this.igracka = nadjena;
      this.ucitavanje = false;
      if (!nadjena) {
        this.router.navigate(['/nije-pronadjeno']);
      }
    });
  }

  nazivKategorije(): string {
    return this.igracka ? this.kategorijeServis.naziv(this.igracka.kategorijaId) : '';
  }

  promeniKolicinu(korak: number): void {
    if (!this.igracka) { return; }
    const nova = this.kolicina + korak;
    if (nova >= 1 && nova <= this.igracka.naStanju) {
      this.kolicina = nova;
    }
  }

  dodajUKorpu(): void {
    if (!this.igracka) { return; }
    this.korpa.dodaj(this.igracka, this.kolicina);
    this.poruke.uspeh('Artikal je dodat u korpu.');
  }
}
