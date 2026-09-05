import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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

import { AdminComponent } from './pages/admin/admin.component';
import { KontrolnaTablaComponent } from './pages/admin/kontrolna-tabla/kontrolna-tabla.component';
import { AdminIgrackeComponent } from './pages/admin/admin-igracke/admin-igracke.component';
import { AdminPorudzbineComponent } from './pages/admin/admin-porudzbine/admin-porudzbine.component';
import { AdminKorisniciComponent } from './pages/admin/admin-korisnici/admin-korisnici.component';

import { adminGuard, authGuard } from './guards/auth.guard';

/**
 * Definicija ruta aplikacije.
 * Administrativne rute su podređene ruti /admin i zaštićene su čuvarem rute.
 */
const rute: Routes = [
  { path: '',                 component: PocetnaComponent,           title: 'Svet igračaka — početna' },
  { path: 'katalog',          component: KatalogComponent,           title: 'Katalog igračaka' },
  { path: 'igracka/:id',      component: DetaljiIgrackeComponent,    title: 'Detalji igračke' },
  { path: 'korpa',            component: KorpaComponent,             title: 'Korpa' },
  { path: 'placanje',         component: PlacanjeComponent,          title: 'Naplata' },
  { path: 'potvrda/:broj',    component: PotvrdaPorudzbineComponent, title: 'Potvrda porudžbine' },
  { path: 'prijava',          component: PrijavaComponent,           title: 'Prijava' },
  { path: 'registracija',     component: RegistracijaComponent,      title: 'Registracija' },
  { path: 'kontakt',          component: KontaktComponent,           title: 'Kontakt' },
  { path: 'nalog',            component: MojNalogComponent,          title: 'Moj nalog', canActivate: [authGuard] },

  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [adminGuard],
    children: [
      { path: '',            component: KontrolnaTablaComponent,  title: 'Kontrolna tabla' },
      { path: 'igracke',     component: AdminIgrackeComponent,    title: 'Upravljanje igračkama' },
      { path: 'porudzbine',  component: AdminPorudzbineComponent, title: 'Upravljanje porudžbinama' },
      { path: 'korisnici',   component: AdminKorisniciComponent,  title: 'Upravljanje korisnicima' }
    ]
  },

  { path: 'nije-pronadjeno', component: NijePronadjenoComponent, title: 'Stranica nije pronađena' },
  { path: '**',              redirectTo: 'nije-pronadjeno' }
];

@NgModule({
  imports: [RouterModule.forRoot(rute, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
