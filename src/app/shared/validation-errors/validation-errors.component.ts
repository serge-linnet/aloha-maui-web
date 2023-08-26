import { Component, Input } from "@angular/core";
import { AbstractControl, ValidationErrors } from "@angular/forms";

@Component({
    selector: "app-validation-errors",
    templateUrl: "./validation-errors.component.html",
    styleUrls: ["./validation-errors.component.scss"]
})
export class ValidationErrorsComponent {
    @Input() control?: AbstractControl<any, any> | null;

    get valid() {
        return !(this.control!.invalid && (this.control!.dirty || this.control!.touched))
    }
}
