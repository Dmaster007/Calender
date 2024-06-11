import { Component } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card';
import { DatePipe } from '@angular/common';
import { EventsComponent } from '../events/events.component';
@Component({
  selector: 'app-calender',
  standalone: true,
  imports: [MatCardModule,MatDatepickerModule ,DatePipe,EventsComponent],
  templateUrl: './calender.component.html',
  styleUrl: './calender.component.css'
})
export class CalenderComponent {
  selected: Date | null = new Date();
}
