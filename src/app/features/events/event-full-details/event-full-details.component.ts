import { Component, Input } from "@angular/core";
import { CommunityEvent, EVENT_STATUS_PENDING } from "src/app/models/event.model";
import { COUNTRIES } from "src/app/static/countries";
import { CURRENCIES } from "src/app/static/currencies";

@Component({
    selector: "app-event-full-details",
    templateUrl: "./event-full-details.component.html",
    styleUrls: ["./event-full-details.component.scss"]
})
export class EventFullDetailsComponent {
    @Input() showStatus = false;
    @Input() event!: CommunityEvent;

    get status() {
        return this.event.status === EVENT_STATUS_PENDING ? "Pending" : "Approved";
    }

    get statusClass() {
        return this.event.status === EVENT_STATUS_PENDING ? "is-warning" : "is-primary";
    }

    get curencySymbol() {
        return CURRENCIES.find(c => c.name === this.event.currency)?.symbol ?? this.event.currency;
    }

    get countryName() {
        return COUNTRIES.find(c => c.code === this.event.place?.country)?.name ?? this.event.place?.country;
    }
}
