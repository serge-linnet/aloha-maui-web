import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { EventService } from "src/app/services/event.service";
import { Event } from "src/app/models/event.model";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";

@Component({
    selector: "app-events",
    templateUrl: "./events.component.html",
    styleUrls: ["./events.component.scss"]
})
export class EventsComponent implements OnInit {
    
    showSignInModal: boolean = false;
    events$!: Observable<Event[]>

    constructor(private eventService: EventService, private router: Router, private authService: AuthService) { }

    ngOnInit() {
        this.events$ = this.eventService.findEvents();
    }

    submitEvent() {
        if (this.authService.isAuthenticated()) {
            this.router.navigate(["/submit-event"]);
        } else {
            this.showSignInModal = true;
        }
    }

    closeSignInModal() {
        this.showSignInModal = false;
    }
}