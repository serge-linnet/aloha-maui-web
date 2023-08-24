import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { CommunityEvent } from "src/app/models/event.model";
import { EventService } from "src/app/services/event.service";

@Component({
    selector: "app-event-details-page",
    templateUrl: "./event-details-page.component.html",
    styleUrls: ["./event-details-page.component.scss"]
})
export class EventDetailsPageComponent implements OnInit {
    event?: CommunityEvent;

    constructor(private route: ActivatedRoute, private eventService: EventService) { }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            const id = params["id"];

            this.eventService.getEvent(id).subscribe((event: CommunityEvent) => {
                this.event = event;
            });
        });
    }
}
