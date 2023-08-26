import { Component, Input } from "@angular/core";
import { CommunityEvent, EVENT_STATUS_PENDING } from "src/app/models/event.model";

@Component({
    selector: "app-event-card",
    templateUrl: "./event-card.component.html",
    styleUrls: ["./event-card.component.scss"]
})
export class EventCardComponent {
    @Input() event!: CommunityEvent;
    @Input() showStatus = false;

    getStatus(status: number) {
        return status === EVENT_STATUS_PENDING ? "Pending" : "Approved";
    }

    getStatusClass(status: number) {
        return status === EVENT_STATUS_PENDING ? "is-warning" : "is-primary";
    }

    get descriptionText() {
        if (!this.event.description) {
            return "";
        }
        const content = new DOMParser()
            .parseFromString(this.event.description, "text/html")
            .documentElement.textContent;
        if (!content) {
            return "";
        }

        if (content?.length < 300) {
            return content;
        }

        return content.substring(0, 300) + "...";
    }
}