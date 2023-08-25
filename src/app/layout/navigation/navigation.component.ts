import { Component, ElementRef, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";

@Component({
    selector: "app-navigation",
    templateUrl: "./navigation.component.html",
    styleUrls: ["./navigation.component.scss"],
    host: {
        "(document:click)": "onDocumentClick($event)",
    }
})
export class NavigationComponent implements OnInit {

    public isMenuActive = false;

    constructor(private authService: AuthService, private router: Router, private eref: ElementRef) {
    }

    get isAuthenticated(): boolean {
        return this.authService.isAuthenticated();
    }

    get isAdmin(): boolean {
        return this.authService.getRole() === "Admin";
    }

    ngOnInit(): void {
        this.router.events.subscribe(() => {
            if (this.isMenuActive) {
                this.toggleMenu();
            }
        })
    }

    onDocumentClick(event: any) {
        if (this.isMenuActive) {
            if (!this.eref.nativeElement.contains(event.target)) {
                this.toggleMenu();
            }
        }
    }

    toggleMenu() {
        this.isMenuActive = !this.isMenuActive;
    }

    signOut() {
        this.authService.signOutExternal();
        this.router.navigate(["/"]);
    }
}
