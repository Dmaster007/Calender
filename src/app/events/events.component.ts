import { CommonModule, DatePipe } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EventsService } from '../events.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EventModalComponent } from '../event-modal/event-modal.component';
import Event from '../event';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [
    DatePipe,
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    EventModalComponent,
  ],
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
})
export class EventsComponent implements OnChanges, OnDestroy {
  @Input() selected: Date | null = null;

  title = new FormControl<string | null>('');
  desc = new FormControl<string | null>('');

  newEvent = new FormGroup({
    title: this.title,
    desc: this.desc,
  });
  color = 'bg-indigo-100';
  selectedColor: string | null = 'indigo';
  currEvents: Event[] = [];
  
  constructor(public events: EventsService, public dialog: MatDialog) {}

  selectColor(color: string): void {
    this.selectedColor = color;
    this.color = `bg-${color}-100`;
    // console.log(this.color);
  }

  openDialog(event: Event) {
    const dialogRef = this.dialog.open(EventModalComponent, {
      data: {
        title: event.title,
        date: event.date,
        id: event.id,
        desc: event.desc,
        color: event.color,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.updateCurrEvents();
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selected'] && changes['selected'].currentValue) {
      this.updateCurrEvents();
    }
  }

  ngOnDestroy() {
    this.events.events.forEach((todo) => {
      if (todo.timerSubscription) {
        todo.timerSubscription.unsubscribe();
      }
    });
  }

  updateCurrEvents(): void {
    if (this.selected) {
      this.currEvents = this.events.events.filter(
        (event) => event.date.toDateString() === this.selected?.toDateString()
      );
    }
  }

  truncate(text: string, limit: number): string {
    return text.length > limit ? text.substring(0, limit) + '...' : text;
  }

  onSubmit(): void {
    if (this.title.value && this.desc.value && this.selected) {
      console.log(this.color);
      
      const event: Event = {
        id: this.events.index++,
        title: this.title.value,
        desc: this.desc.value,
        date: this.selected,
        color: this.color,
      };
      this.events.events.push(event);
      this.title.reset();
      this.desc.reset();
      this.updateCurrEvents();

      if (
        this.events.timeDifferenceInSeconds(
          this.events.todaysDate.toTimeString().substring(0, 5),
          '12:00'
        ) && this.events.todaysDate.getDay() === this.selected.getDay()
      ) {
        this.events.startTaskTimer(event);
      }
    } else {
      alert('Please fill out all details');
    }
  }
}
