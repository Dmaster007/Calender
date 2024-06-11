import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CalenderComponent } from './calender/calender.component';
import {provideNativeDateAdapter} from '@angular/material/core';
import { NavbarComponent } from './navbar/navbar.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CalenderComponent,NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers:[provideNativeDateAdapter()]
})
export class AppComponent {
  title = 'Calender';
  
}
