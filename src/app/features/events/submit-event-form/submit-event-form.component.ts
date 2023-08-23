import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
    BOLD_BUTTON, ITALIC_BUTTON, ORDERED_LIST_BUTTON,
    SEPARATOR, SUBSCRIPT_BUTTON, SUPERSCRIPT_BUTTON,
    UNDERLINE_BUTTON, UNORDERED_LIST_BUTTON
} from "ngx-simple-text-editor";

@Component({
    selector: "app-submit-event-form",
    templateUrl: "./submit-event-form.component.html",
    styleUrls: ["./submit-event-form.component.scss"]
})
export class SubmitEventFormComponent {
    eventForm: FormGroup;

    editorButtons = [BOLD_BUTTON, ITALIC_BUTTON, UNDERLINE_BUTTON, SEPARATOR,
        ORDERED_LIST_BUTTON, UNORDERED_LIST_BUTTON, SEPARATOR,
        SUBSCRIPT_BUTTON, SUPERSCRIPT_BUTTON];

    constructor(private formBuilder: FormBuilder) {
        this.eventForm = this.formBuilder.group({
            title: ["", Validators.required],
            description: [""],
            category: [""],
            price: [""],
            currency: [""],
            photoUrl: [""],
            startsAt: [""],
            endsAt: [""],
            place: [""]
        });
    }


    displayError(formControlName: string) {
        const control = this.eventForm.get(formControlName);
        if (!control) {
            return '';
        }

        if (control.invalid && (control.dirty || control.touched)) {
            return 'is-danger';
        }
        return '';
    }    

    onSubmit() {
        console.log(this.eventForm.valid);
        console.log(this.eventForm.value)
    }
}
