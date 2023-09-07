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
    events: CommunityEvent[] = []
    isLoading: boolean = false;

    constructor(private eventService: EventService, private router: Router, private ngZone: NgZone) { }

    ngOnInit() {
        this.isLoading = true;
        this.eventService.findEvents().subscribe((events) => {
            this.events = events;
        }, (error) => { }, () => {
            this.isLoading = false;
        });
    }

    filterChanged(filter: any) {
        this.isLoading = true;
        this.eventService.findEvents(filter).subscribe((events) => {
            this.events = events;
        }, (error) => { }, () => {
            this.isLoading = false;
        });
    }
}