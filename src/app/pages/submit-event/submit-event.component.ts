import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";

@Component({
    selector: "app-submit-event",
    templateUrl: "./submit-event.component.html",
    styleUrls: ["./submit-event.component.scss"]
})
export class SubmitEventComponent {
    get isLoggedIn(): boolean {
        return this.authService.isAuthenticated();
    }

    constructor(private authService: AuthService) {
    }
}