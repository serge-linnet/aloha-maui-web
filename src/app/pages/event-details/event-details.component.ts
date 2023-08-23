import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { Event } from "src/app/models/event.model";
import { EventService } from "src/app/services/event.service";

@Component({
    selector: "app-event-details",
    templateUrl: "./event-details.component.html",
    styleUrls: ["./event-details.component.scss"]
})
export class EventDetailsComponent implements OnInit {
    event: Event = new Event();

    constructor(private route: ActivatedRoute, private eventService: EventService) { }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            const id = params["id"];

            this.eventService.getEvent(id).subscribe((event: Event) => {
                this.event = event;
            });
        });
    }
}
