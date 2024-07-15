import { Subscription } from "rxjs";

export default interface Event{
    id:number,
    title:string,
    date:Date,
    desc:string,
    color:string,
    timerSubscription?: Subscription;
}