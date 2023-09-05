import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { ideas as CONTENT_IDEAS } from "./ideas.content"
import { CONTACTS } from "src/app/static/contacts";

@Component({
    selector: "app-submit-event",
    templateUrl: "./submit-event.component.html",
    styleUrls: ["./submit-event.component.scss"]
})
export class SubmitEventComponent {
    contacts = CONTACTS;
    
    get isLoggedIn(): boolean {
        return this.authService.isAuthenticated();
    }

    get ideas() {
        return CONTENT_IDEAS;
    }

    constructor(private authService: AuthService) {
    }
}