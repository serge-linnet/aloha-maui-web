import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { EventService } from "src/app/services/event.service";
import { CommunityEvent } from "src/app/models/event.model";

@Component({
    selector: "app-my-events",
    templateUrl: "./my-events.component.html",
    styleUrls: ["./my-events.component.scss"]
})
export class MyEventsComponent {
    events$!: Observable<CommunityEvent[]>

    constructor(private eventService: EventService) { }

    ngOnInit() {
        this.events$ = this.eventService.findMyEvents();
    }
}
