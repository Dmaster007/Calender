import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogModule } from '@angular/material/dialog';
import Event from '../event';
import { CommonModule, DatePipe, UpperCasePipe  ,TitleCasePipe} from '@angular/common';
import { EventsService } from '../events.service';


@Component({
  selector: 'app-event-modal',
  standalone: true,
  imports: [MatDialogModule,MatDialogContent,UpperCasePipe, DatePipe,CommonModule],
  templateUrl: './event-modal.component.html',
  styleUrl: './event-modal.component.css'
})



export class EventModalComponent {

    constructor(@Inject(MAT_DIALOG_DATA) public data: Event , public events : EventsService){
    }
    // @Output() deleteevent = new EventEmitter<string>();
    deleteEvent(){
      this.events.events = this.events.events.filter((event)=> event.id !== this.data.id)
      // this.deleteevent.emit('deleted');
    }

}
