import { Component, Input } from "@angular/core";

@Component({
    selector: "app-container",
    templateUrl: "./container.component.html",
    styleUrls: ["./container.component.less"]
})
export class ContainerComponent {
    @Input()
    public size: "narrow" | undefined

    getClass() {
        switch (this.size) {
            case "narrow": {
                return "is-narrow"
            }
        }
        return "";
    }
}
