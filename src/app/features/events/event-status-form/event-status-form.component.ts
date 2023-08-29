import { Component, Input } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { CommunityEvent, EVENT_STATUS_APPROVED, EVENT_STATUS_PENDING, EVENT_STATUS_REJECTED } from "src/app/models/event.model";
import { EventService } from "src/app/services/event.service";

@Component({
    selector: "app-event-status-form",
    templateUrl: "./event-status-form.component.html",
    styleUrls: ["./event-status-form.component.scss"]
})
export class EventStatusFormComponent {
    @Input() event!: CommunityEvent;

    loading: boolean = false;
    eventStatus: number | undefined;
    rejecting: boolean = false;
    pending: boolean = false;
    approving: boolean = false;

    constructor(private eventService: EventService, private toastr: ToastrService) {}

    ngOnInit() {
        this.eventStatus = this.event.status;
    }

    get isApproved(): boolean {
        return this.eventStatus === EVENT_STATUS_APPROVED;
    }

    get isPending(): boolean {
        return this.eventStatus === EVENT_STATUS_PENDING;
    }

    get isRejected(): boolean {
        return this.eventStatus === EVENT_STATUS_REJECTED;
    }

    onApprove() {
        this.loading = true;
        this.approving = true;
        this.eventService.changeStatus(this.event.id, EVENT_STATUS_APPROVED).subscribe(() => {
            this.toastr.success("Event approved");
            this.eventStatus = EVENT_STATUS_APPROVED;
        }, () => {
            this.toastr.error("Error approving event");
        }, () => {
            this.loading = false;
            this.approving = false;
        });
    }

    onPending() {
        this.loading = true;
        this.pending = true;
        this.eventService.changeStatus(this.event.id, EVENT_STATUS_PENDING).subscribe(() => {
            this.toastr.success("Event pending");
            this.eventStatus = EVENT_STATUS_PENDING;
        }, () => {
            this.toastr.error("Error pending event");
        }, () => {
            this.loading = false;
            this.pending = false;
        });
    }

    onReject() {
        this.loading = true;
        this.rejecting = true;
        this.eventService.changeStatus(this.event.id, EVENT_STATUS_REJECTED).subscribe(() => {
            this.toastr.success("Event rejected");
            this.eventStatus = EVENT_STATUS_REJECTED;
        }, () => {
            this.toastr.error("Error rejecting event");
        }, () => {
            this.loading = false;
            this.rejecting = false;
        });
    }
}
