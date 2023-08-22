import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import {
    BOLD_BUTTON, EditorConfig, ITALIC_BUTTON, ORDERED_LIST_BUTTON,
    SEPARATOR, SUBSCRIPT_BUTTON, SUPERSCRIPT_BUTTON,
    UNDERLINE_BUTTON, UNORDERED_LIST_BUTTON
} from "ngx-simple-text-editor";

@Component({
    selector: "app-submit-event",
    templateUrl: "./submit-event.component.html",
    styleUrls: ["./submit-event.component.less"]
})
export class SubmitEventComponent implements OnInit {

    eventForm: FormGroup;

    editorButtons = [BOLD_BUTTON, ITALIC_BUTTON, UNDERLINE_BUTTON, SEPARATOR,
        ORDERED_LIST_BUTTON, UNORDERED_LIST_BUTTON, SEPARATOR,
        SUBSCRIPT_BUTTON, SUPERSCRIPT_BUTTON];

    constructor(private formBuilder: FormBuilder) {
        this.eventForm = this.formBuilder.group({
            title: [''],
            description: [''],
            category: [''],
            price: [''],
            currency: [''],
            photoUrl: [''],
            startsAt: [''],
            endsAt: [''],
            place: ['']
        });
    }

    ngOnInit(): void {
        
    }

    onSubmit() {
        console.log(this.eventForm.value)
    }
}


