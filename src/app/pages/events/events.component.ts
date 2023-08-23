import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { EventService } from "src/app/services/event.service";
import { Event } from "src/app/models/event.model";

@Component({
    selector: "app-events",
    templateUrl: "./events.component.html",
    styleUrls: ["./events.component.scss"]
})
export class EventsComponent implements OnInit {
    
    events$!: Observable<Event[]>

    constructor(private eventService: EventService) { }

    ngOnInit() {
        this.events$ = this.eventService.findEvents();
    }
}