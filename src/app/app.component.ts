import { Component } from '@angular/core';

/** Korenska komponenta aplikacije: zaglavlje, sadržaj rute i podnožje. */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  naslov = 'Svet igračaka';
}
