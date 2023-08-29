import { Component, Input } from "@angular/core";
import { EVENT_STATUS_PENDING, CommunityEvent } from "src/app/models/event.model";

@Component({
    selector: "app-event-list",
    templateUrl: "./event-list.component.html",
    styleUrls: ["./event-list.component.scss"]
})
export class EventListComponent {
    @Input() events: CommunityEvent[] = [];
    @Input() showStatus = false;
    @Input() link: string[] = [];
    @Input() redirectLink: string[] = []

    getStatus(status: number) {
        return status === EVENT_STATUS_PENDING ? "Pending" : "Approved";
    }
    
    getStatusClass(status: number) {
        return status === EVENT_STATUS_PENDING ? "is-warning" : "is-primary";
    }
}