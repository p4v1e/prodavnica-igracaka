import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';

import { AppComponent } from './app.component';

/* Zajedničke komponente */
import { ZaglavljeComponent } from './shared/zaglavlje/zaglavlje.component';
import { PodnozjeComponent } from './shared/podnozje/podnozje.component';
import { IgrackaKarticaComponent } from './shared/igracka-kartica/igracka-kartica.component';
import { PotvrdaDijalogComponent } from './shared/potvrda-dijalog/potvrda-dijalog.component';

/* Stranice prodavnice */
import { PocetnaComponent } from './pages/pocetna/pocetna.component';
import { KatalogComponent } from './pages/katalog/katalog.component';
import { DetaljiIgrackeComponent } from './pages/detalji-igracke/detalji-igracke.component';
import { KorpaComponent } from './pages/korpa/korpa.component';
import { PlacanjeComponent } from './pages/placanje/placanje.component';
import { PotvrdaPorudzbineComponent } from './pages/potvrda-porudzbine/potvrda-porudzbine.component';
import { PrijavaComponent } from './pages/prijava/prijava.component';
import { RegistracijaComponent } from './pages/registracija/registracija.component';
import { MojNalogComponent } from './pages/moj-nalog/moj-nalog.component';
import { KontaktComponent } from './pages/kontakt/kontakt.component';
import { NijePronadjenoComponent } from './pages/nije-pronadjeno/nije-pronadjeno.component';

/* Administrativni deo */
import { AdminComponent } from './pages/admin/admin.component';
import { KontrolnaTablaComponent } from './pages/admin/kontrolna-tabla/kontrolna-tabla.component';
import { AdminIgrackeComponent } from './pages/admin/admin-igracke/admin-igracke.component';
import { IgrackaFormaComponent } from './pages/admin/admin-igracke/igracka-forma/igracka-forma.component';
import { AdminPorudzbineComponent } from './pages/admin/admin-porudzbine/admin-porudzbine.component';
import { AdminKorisniciComponent } from './pages/admin/admin-korisnici/admin-korisnici.component';

// Korenski modul aplikacije
@NgModule({
  declarations: [
    AppComponent,
    ZaglavljeComponent,
    PodnozjeComponent,
    IgrackaKarticaComponent,
    PotvrdaDijalogComponent,
    PocetnaComponent,
    KatalogComponent,
    DetaljiIgrackeComponent,
    KorpaComponent,
    PlacanjeComponent,
    PotvrdaPorudzbineComponent,
    PrijavaComponent,
    RegistracijaComponent,
    MojNalogComponent,
    KontaktComponent,
    NijePronadjenoComponent,
    AdminComponent,
    KontrolnaTablaComponent,
    AdminIgrackeComponent,
    IgrackaFormaComponent,
    AdminPorudzbineComponent,
    AdminKorisniciComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
