import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import {
    BOLD_BUTTON, ITALIC_BUTTON, ORDERED_LIST_BUTTON,
    SEPARATOR, SUBSCRIPT_BUTTON, SUPERSCRIPT_BUTTON,
    UNDERLINE_BUTTON, UNORDERED_LIST_BUTTON
} from "ngx-simple-text-editor";
import { ToastrService } from "ngx-toastr";
import { EventService } from "src/app/services/event.service";

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

    // eventCategories = [
    //     { name: "Select Category", value: "" },
    //     { name: "Other", value: "other" },
    // ];

    constructor(private formBuilder: FormBuilder, private eventService: EventService, private toastr: ToastrService, private router: Router) {
        this.eventForm = this.formBuilder.group({
            title: ["", Validators.required],
            description: [""],
            //category: [""],
            price: ["", Validators.required],
            currency: ["EUR", Validators.required],
            photo: [""],
            startsAt: ["", Validators.required],
            endsAt: ["", Validators.required],
            place: ["", Validators.required],
            type: ["offline"],
            onlineDetails: [""],
            familyFriendly: [false],
            dogFriendly: [false],
            instagram: [""],
            facebook: [""],
            contactEmail: ["", Validators.required],
            contactPhone: [""],
            website: [""]
        });
    }

    get eventType() {
        return this.eventForm.get("type")?.value ?? "offline";
    }

    async imagePicked(event: Event) {
        const file = (event.target as HTMLInputElement).files![0];        

        var dataUrlReaderPromise = new Promise<string | ArrayBuffer | null>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                resolve(reader.result);
            };
            reader.onerror = error => reject(error);
        });
        const fileDataUrl = await dataUrlReaderPromise;
        
        this.eventForm.patchValue({ photo: fileDataUrl });
        this.eventForm.get("photo")?.updateValueAndValidity();
    }

    displayError(formControlName: string) {
        const control = this.eventForm.get(formControlName);
        if (!control) {
            return '';
        }

        if (control.invalid && (control.dirty || control.touched)) {
            console.log(control.errors);
            return 'is-danger';
        }
        return '';
    }

    async onSubmit() {
        this.eventService.create(this.eventForm.value).subscribe(x => {
            this.toastr.success("Event created successfully!");
            this.router.navigate(["/events", x.id]);
        }, error => {
            this.toastr.error("Something went wrong!");
        });
        
    }
}
