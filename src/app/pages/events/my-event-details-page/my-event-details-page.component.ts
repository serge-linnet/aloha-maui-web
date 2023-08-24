import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CommunityEvent } from 'src/app/models/event.model';
import { EventService } from 'src/app/services/event.service';

@Component({
    selector: 'app-my-event-details-page',
    templateUrl: './my-event-details-page.component.html',
    styleUrls: ['./my-event-details-page.component.scss']
})
export class MyEventDetailsPageComponent implements OnInit {
    event?: CommunityEvent;

    constructor(private route: ActivatedRoute, private eventService: EventService) { }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            const id = params["id"];

            this.eventService.getEvent(id).subscribe((event: CommunityEvent) => {
                this.event = event;
            });
        });
    }
}
