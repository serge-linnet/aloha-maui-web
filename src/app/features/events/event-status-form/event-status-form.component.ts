import { Component, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CommunityEvent, EVENT_STATUS_APPROVED, EVENT_STATUS_PENDING, EVENT_STATUS_REJECTED } from 'src/app/models/event.model';
import { EventService } from 'src/app/services/event.service';

@Component({
    selector: 'app-event-status-form',
    templateUrl: './event-status-form.component.html',
    styleUrls: ['./event-status-form.component.scss']
})
export class EventStatusFormComponent {
    @Input() event!: CommunityEvent;

    constructor(private eventService: EventService, private toastr: ToastrService) {}

    get isApproved(): boolean {
        return this.event?.status === EVENT_STATUS_APPROVED;
    }

    get isPending(): boolean {
        return this.event?.status === EVENT_STATUS_PENDING;
    }

    get isRejected(): boolean {
        return this.event?.status === EVENT_STATUS_REJECTED;
    }

    approve() {
        this.eventService.changeStatus(this.event.id, EVENT_STATUS_APPROVED).subscribe(() => {
            this.toastr.success("Event approved");
        });
    }

    pending() {
        this.eventService.changeStatus(this.event.id, EVENT_STATUS_PENDING).subscribe(() => {
            this.toastr.success("Event pending");
        });
    }

    reject() {
        this.eventService.changeStatus(this.event.id, EVENT_STATUS_REJECTED).subscribe(() => {
            this.toastr.success("Event rejected");
        });
    }
}
