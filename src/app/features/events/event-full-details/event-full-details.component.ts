import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";
import { CommunityEvent, EVENT_STATUS_PENDING } from "src/app/models/event.model";
import { AuthService } from "src/app/services/auth.service";
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
    @Input() showEditButton = false;

    constructor(private router: Router, private authService: AuthService) {}

    get canEdit() {
        const userId = this.authService.getUserId()
        const role = this.authService.getRole();
        return (role === "Admin" || userId === this.event.userId);
    }

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

    onEdit() {  
        this.router.navigate(["/events", this.event.id, "edit"]);
    }
}
