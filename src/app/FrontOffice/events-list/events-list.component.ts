import { Component } from '@angular/core';
import { Event } from 'src/app/models/event';
import { EventService } from 'src/app/services/event.service';
@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css']
})
export class EventsListComponent {
  events ! : Event[];
  constructor(private eventservice : EventService){}


ngOnInit(): void {
  console.log("HELLO FROM EVENTS")
  this.Allevents();

}



Allevents(){

  this.eventservice.getEvents().subscribe(
    (data) =>{
      this.events=data;
      console.log(this.events)
    },(err) =>{
      console.log("ERROR WHILE FETCHING events LIST ");
    }
  )
}

}


