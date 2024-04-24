import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UrlFormComponent } from './url-form/url-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UrlFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Web Scraping Nestle Recipes';
}
