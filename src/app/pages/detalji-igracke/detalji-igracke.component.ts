import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Igracka } from '../../models';
import { IgrackeService, KategorijeService, KorpaService, NotifikacijeService } from '../../services';

// Prikaz podataka o izabranoj igracki i dodavanje u korpu
@Component({
  selector: 'app-detalji-igracke',
  templateUrl: './detalji-igracke.component.html',
  styleUrls: ['./detalji-igracke.component.css']
})
export class DetaljiIgrackeComponent implements OnInit {
  private ruta = inject(ActivatedRoute);
  private router = inject(Router);
  private igrackeServis = inject(IgrackeService);
  private kategorijeServis = inject(KategorijeService);
  private korpa = inject(KorpaService);
  private poruke = inject(NotifikacijeService);

  igracka?: Igracka;
  kolicina = 1;
  ucitavanje = true;

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
