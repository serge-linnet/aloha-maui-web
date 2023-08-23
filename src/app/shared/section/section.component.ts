import { Component, Input } from "@angular/core";

@Component({
    selector: "app-section",
    templateUrl: "./section.component.html",
    styleUrls: ["./section.component.scss"]
})
export class SectionComponent {
    @Input()
    public size: "medium" | "large" | "none" | undefined

    getClass() {
        switch(this.size) {
            case "large": {
                return "is-large"
            }
            case "medium": {
                return "is-medium"
            }
            case "none": {
                return "is-none"
            }
        }
        return "";
    }
}
