import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CommunityEvent } from 'src/app/models/event.model';
import { EventService } from 'src/app/services/event.service';

@Component({
    selector: 'app-whats-on',
    templateUrl: './whats-on.component.html',
    styleUrls: ['./whats-on.component.scss']
})
export class WhatsOnComponent implements OnInit {
    
    selectedEvent?: CommunityEvent;
    events$!: Observable<CommunityEvent[]>

    constructor(private eventService: EventService, private router: Router, private ngZone: NgZone) { }

    ngOnInit() {
        this.events$ = this.eventService.findEvents();
    }

    eventSelected(event: CommunityEvent) {
        this.selectedEvent = event;
    }
}