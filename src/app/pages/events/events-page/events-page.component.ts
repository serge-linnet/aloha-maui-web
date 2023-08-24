import { Component, NgZone, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { EventService } from "src/app/services/event.service";
import { CommunityEvent } from "src/app/models/event.model";
import { Router } from "@angular/router";

@Component({
    selector: "app-events",
    templateUrl: "./events-page.component.html",
    styleUrls: ["./events-page.component.scss"]
})
export class EventsPageComponent implements OnInit {
    
    events$!: Observable<CommunityEvent[]>

    constructor(private eventService: EventService, private router: Router, private ngZone: NgZone) { }

    ngOnInit() {
        this.events$ = this.eventService.findEvents();
    }
}