import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { CommunityEvent } from "src/app/models/event.model";
import { EventService } from "src/app/services/event.service";

@Component({
    selector: "app-manage-event-details",
    templateUrl: "./manage-event-details.component.html",
    styleUrls: ["./manage-event-details.component.scss"]
})
export class ManageEventDetailsComponent implements OnInit {
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