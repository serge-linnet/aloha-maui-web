import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";

@Component({
    selector: "app-navigation",
    templateUrl: "./navigation.component.html",
    styleUrls: ["./navigation.component.scss"]
})
export class NavigationComponent {

    get isAuthenticated(): boolean {
        return this.authService.isAuthenticated();
    }

    constructor(private authService: AuthService, private router: Router) {
    }

    public isMenuActive = false;

    toggleMenu() {
        this.isMenuActive = !this.isMenuActive;
    }

    signOut() {
        this.authService.signOutExternal();
        this.router.navigate(["/"]);
    }
}
