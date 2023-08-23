import { Component, NgZone } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Component({
    selector: "app-logout",
    templateUrl: "./logout.component.html",
    styleUrls: ["./logout.component.scss"]
})
export class LogoutComponent {
    constructor(private router: Router,
        private authService: AuthService,
        private ngZone: NgZone) { }

    logout() {
        this.authService.signOutExternal();
        this.ngZone.run(() =>
            this.router.navigate(["/"]).then(() =>
                window.location.reload()));
    }
}
