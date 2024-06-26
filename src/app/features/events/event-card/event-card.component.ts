import { Component, ElementRef, Input, SimpleChange } from "@angular/core";
import { CommunityEvent, EVENT_STATUS_PENDING } from "src/app/models/event.model";
import { COUNTRIES } from "src/app/static/countries";
import { CURRENCIES } from "src/app/static/currencies";

@Component({
    selector: "app-event-card",
    templateUrl: "./event-card.component.html",
    styleUrls: ["./event-card.component.scss"]
})
export class EventCardComponent {
    @Input() event!: CommunityEvent;
    @Input() showStatus = false;
    @Input() isSelected = false;
    @Input() link: string[] = []

    constructor(private element: ElementRef ) {
        
    }

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

    get curencySymbol() {
        return CURRENCIES.find(c => c.name === this.event.currency)?.symbol ?? this.event.currency;
    }

    get countryName() {
        return COUNTRIES.find(c => c.code === this.event.place?.country)?.name ?? this.event.place?.country;
    }

    get address() {
        const country = this.countryName;
        const region = this.event.place?.region;
        const locality = this.event.place?.locality;
        const place = this.event.place?.placeName;

        const address = [place, locality ?? region, country].filter(a => a).join(", ");
        return address;
    }

    get routerLink() {
        if (this.link && this.link.length > 0) {
            return [...this.link, this.event.id]
        } else {
            return ["/events", this.event.id]
        }
    }

    ngOnChanges() {        
        if (this.isSelected) {
            this.element.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
        }
    }
}