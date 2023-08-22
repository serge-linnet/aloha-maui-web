import { Component, Input } from "@angular/core";

@Component({
    selector: "app-container",
    templateUrl: "./container.component.html",
    styleUrls: ["./container.component.scss"]
})
export class ContainerComponent {
    @Input()
    public size: "narrow" | "medium" | undefined

    getClass() {
        switch (this.size) {
            case "narrow": {
                return "is-narrow"
            }
            case "medium": {
                return "is-medium"
            }
        }
        return "";
    }
}
