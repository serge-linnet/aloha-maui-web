import { Component, Input } from '@angular/core';
import { CommunityEvent, EVENT_STATUS_PENDING } from 'src/app/models/event.model';

@Component({
    selector: 'app-event-full-details',
    templateUrl: './event-full-details.component.html',
    styleUrls: ['./event-full-details.component.scss']
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
}
