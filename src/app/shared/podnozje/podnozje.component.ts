import { Component } from '@angular/core';

// Podnozje sa osnovnim podacima o prodavnici
@Component({
  selector: 'app-podnozje',
  templateUrl: './podnozje.component.html',
  styleUrls: ['./podnozje.component.css']
})
export class PodnozjeComponent {
  godina = new Date().getFullYear();
}
