import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";

@Component({
    selector: "app-navigation",
    templateUrl: "./navigation.component.html",
    styleUrls: ["./navigation.component.scss"]
})
export class NavigationComponent {

    public isMenuActive = false;

    constructor(private authService: AuthService, private router: Router) {
    }

    get isAuthenticated(): boolean {
        return this.authService.isAuthenticated();
    }
    
    get isAdmin(): boolean {
        return this.authService.getRole() === "Admin";        
    }
    
    toggleMenu() {
        this.isMenuActive = !this.isMenuActive;
    }

    signOut() {
        this.authService.signOutExternal();
        this.router.navigate(["/"]);
    }

    
}
