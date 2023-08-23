import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { EventService } from "src/app/services/event.service";
import { Event } from "src/app/models/event.model";

@Component({
    selector: "app-manage-events",
    templateUrl: "./manage-events.component.html",
    styleUrls: ["./manage-events.component.scss"]
})
export class ManageEventsComponent implements OnInit {
    
    events$!: Observable<Event[]>

    constructor(private eventService: EventService) { }

    ngOnInit() {
        this.events$ = this.eventService.findPendingEvents();
    }

    
}