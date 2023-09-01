import { Component } from '@angular/core';
import { CONTACTS } from 'src/app/static/contacts';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  contacts = CONTACTS
}
