import { Component } from "@angular/core";

@Component({
    selector: "app-navigation",
    templateUrl: "./navigation.component.html",
    styleUrls: ["./navigation.component.scss"]
})
export class NavigationComponent {
    public isMenuActive = false;

    toggleMenu() {
        this.isMenuActive = !this.isMenuActive;
    }
}
