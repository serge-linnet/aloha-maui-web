import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { EventService } from "src/app/services/event.service";
import { CommunityEvent } from "src/app/models/event.model";
import { FormBuilder } from "@angular/forms";
import { ManageCommunityEventsFilter } from "src/app/models/manage-community-events-filter";

@Component({
    selector: "app-manage-events",
    templateUrl: "./manage-events.component.html",
    styleUrls: ["./manage-events.component.scss"]
})
export class ManageEventsComponent implements OnInit {
    
    events$!: Observable<CommunityEvent[]>

    constructor(private eventService: EventService, private formBuilder: FormBuilder) { }

    filterForm = this.formBuilder.group({
        includeApproved: [false],
        includeRejected: [false]
    });

    ngOnInit() {
        this.search();
    }

    search() {  
        const filter = this.filterForm.value as ManageCommunityEventsFilter;
        console.log(filter);
        this.events$ = this.eventService.findPendingEvents(filter);
    }

    
}