import { Component, Input } from "@angular/core";

@Component({
    selector: "app-modal",
    templateUrl: "./modal.component.html",
    styleUrls: ["./modal.component.scss"]
})
export class ModalComponent {
    @Input() open = false;
    @Input() options: { hasCloseButton: boolean } = { hasCloseButton: true };
    
    close() {
        this.open = false;
    }
}
