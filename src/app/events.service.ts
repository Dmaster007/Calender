import { Injectable } from '@angular/core';
import Event from './event';
import { interval, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  events : Event[] = [];
  index = 0;
  todaysDate  =  new Date();
  constructor() { }

  startTaskTimer(event: Event) {
    let deadline = this.timeDifferenceInSeconds(
      this.todaysDate.toTimeString().substring(0, 5),
      '12:00'
    )
    //this.timeDifferenceInSeconds(task.time, task.deadline);
    
    if(deadline === 0){
      deadline = 3600;
    }
    event.timerSubscription = interval(1000)
      .pipe(take(deadline))
      .subscribe({
        next: (val) => {
          // Notify the user if val reaches index - 1  (0-based index)
          if (val === deadline-1) {
            this.notify(event);
          }
        },
        complete: () => {
          // Unsubscribe when the timer completes
          event.timerSubscription?.unsubscribe();
        },
      });
  }
  
  notify(event : Event){

  }
  timeDifferenceInSeconds(time1: string, time2: string) {
    // Split the time strings into hours and minutes
    const [hours1, minutes1] = time1.split(':').map(Number);
    const [hours2, minutes2] = time2.split(':').map(Number);
    // Convert both times to minutes
    const totalMinutes1 = hours1 * 60 + minutes1;
    const totalMinutes2 = hours2 * 60 + minutes2;
    // Calculate the difference in minutes
    if((totalMinutes2-totalMinutes1) <= 0){
      return 0;
    }
    const differenceInMinutes = Math.abs(totalMinutes1 - totalMinutes2);
    // Convert the difference back to seconds
    const differenceInSeconds = differenceInMinutes * 60;
    return differenceInSeconds;
  }
}
