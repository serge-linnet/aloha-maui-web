import { Component, Input } from "@angular/core";

@Component({
    selector: "app-charity-card",
    templateUrl: "./charity-card.component.html",
    styleUrls: ["./charity-card.component.scss"]
})
export class CharityCardComponent {
    @Input() description?: string;
    @Input() title!: string;
    @Input() charityUrl!: string;
    @Input() imageUrl!: string;
}
