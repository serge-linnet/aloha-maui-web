import { Component, Input } from "@angular/core";

@Component({
    selector: "app-section",
    templateUrl: "./section.component.html"
})
export class SectionComponent {
    @Input()
    public size: "medium" | "large" | undefined

    getClass() {
        switch(this.size) {
            case "large": {
                return "is-large"
            }
            case "medium": {
                return "is-medium"
            }
        }
        return "";
    }
}
