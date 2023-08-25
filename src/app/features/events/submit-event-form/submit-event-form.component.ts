import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import {
    BOLD_BUTTON, ITALIC_BUTTON, ORDERED_LIST_BUTTON,
    SEPARATOR, SUBSCRIPT_BUTTON, SUPERSCRIPT_BUTTON,
    UNDERLINE_BUTTON, UNORDERED_LIST_BUTTON
} from "ngx-simple-text-editor";
import { ToastrService } from "ngx-toastr";
import { Place } from "src/app/models/place.model";
import { EventService } from "src/app/services/event.service";

@Component({
    selector: "app-submit-event-form",
    templateUrl: "./submit-event-form.component.html",
    styleUrls: ["./submit-event-form.component.scss"]
})
export class SubmitEventFormComponent implements OnInit {
    eventForm: FormGroup;

    countries = [
        { name: "Ireland", code: "IE" }, 
        { name: "Portugal", code: "PT" }, 
        { name: "United Kingdom", code: "UK" }, 
        { name: "United States", code: "US"}
    ]

    editorButtons = [BOLD_BUTTON, ITALIC_BUTTON, UNDERLINE_BUTTON, SEPARATOR,
        ORDERED_LIST_BUTTON, UNORDERED_LIST_BUTTON, SEPARATOR,
        SUBSCRIPT_BUTTON, SUPERSCRIPT_BUTTON];

    addressPicked = false;

    constructor(private formBuilder: FormBuilder, private eventService: EventService, private toastr: ToastrService, private router: Router) {
        this.eventForm = this.formBuilder.group({
            title: ["", Validators.required],
            description: [""],
            price: ["", Validators.required],
            currency: ["EUR", Validators.required],
            photo: [""],
            startsAt: ["", Validators.required],
            endsAt: ["", Validators.required],
            place: this.formBuilder.group({
                placeName: [],
                address: [],
                postcode: [],
                locality: [],
                region: [],
                country: [],
                latitude: [],
                longitude: []
            }),
            isOffline: [true],
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

    get isOffline(): boolean {
        return this.eventForm.get("isOffline")?.value ?? true;
    }

    get now(): Date {
        return new Date();
    }

    get minDate(): Date {
        const min = this.eventForm.get("startsAt")?.value;
        if (min) {
            return min;
        }
        return this.now;
    }

    ngOnInit(): void {
        if (this.eventForm.get("startsAt")) {
            this.eventForm.get("startsAt")?.valueChanges.subscribe(x => {
                const startsAt = this.eventForm.get("startsAt")
                const endsAt = this.eventForm.get("endsAt")

                if (startsAt && endsAt) {
                    if (startsAt.value > endsAt.value) {
                        this.eventForm.get("endsAt")?.patchValue("");
                    }
                }
            })
        }
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

    placeChanged(place: Place) {
        console.log(place);
        this.addressPicked = true;
        this.eventForm.get("place")?.reset();
        this.eventForm.patchValue({ place: place });
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
        console.log(this.eventForm.value);

        if (this.eventForm.invalid) {
            this.toastr.error("Please fill in all required fields.");
            return;
        }

        this.eventService.create(this.eventForm.value).subscribe(x => {
            this.toastr.success("Event created successfully!");
            this.router.navigate(["/events", x.id]);
        }, error => {
            this.toastr.error("Something went wrong!");
        });

    }
}
