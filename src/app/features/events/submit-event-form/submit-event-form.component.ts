import { Component, Input, NgZone, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import {
    BOLD_BUTTON, ITALIC_BUTTON, ORDERED_LIST_BUTTON,
    SEPARATOR, SUBSCRIPT_BUTTON, SUPERSCRIPT_BUTTON,
    UNDERLINE_BUTTON, UNORDERED_LIST_BUTTON
} from "ngx-simple-text-editor";
import { ToastrService } from "ngx-toastr";
import { Place } from "src/app/models/place.model";
import { EventService } from "src/app/services/event.service";
import { COUNTRIES } from "src/app/static/countries";

@Component({
    selector: "app-submit-event-form",
    templateUrl: "./submit-event-form.component.html",
    styleUrls: ["./submit-event-form.component.scss"]
})
export class SubmitEventFormComponent implements OnInit {
    @Input() redirectLink = ["/events"];
    
    countries = COUNTRIES;
    
    editorButtons = [BOLD_BUTTON, ITALIC_BUTTON, UNDERLINE_BUTTON, SEPARATOR,
        ORDERED_LIST_BUTTON, UNORDERED_LIST_BUTTON, SEPARATOR,
        SUBSCRIPT_BUTTON, SUPERSCRIPT_BUTTON];
    addressPicked = false;
    submitting = false;
    eventSubmitted = false;
    eventForm: FormGroup;

    constructor(private formBuilder: FormBuilder, private eventService: EventService, private toastr: ToastrService, 
        private router: Router, private ngZone: NgZone) {
        this.eventForm = this.formBuilder.group({
            title: ["", Validators.required],
            description: ["", Validators.required],
            price: [null],
            currency: ["EUR"],
            photo: ["", Validators.required],
            startsAt: ["", this.requiredDateValidator],
            endsAt: ["", [this.requiredDateValidator, this.endsAfterStartDateValidator]],
            place: this.formBuilder.group({
                placeName: [""],
                address: ["", this.requiredIfOffline],
                postcode: ["", this.requiredIfOffline],
                locality: ["", this.requiredIfOffline],
                region: ["", this.requiredIfOffline],
                country: ["", this.requiredIfOffline],
                latitude: ["", this.requiredIfOffline],
                longitude: ["", this.requiredIfOffline]
            }),
            isOffline: [true],
            onlineDetails: ["", this.requiredIfOnline],
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

        const dataUrlReaderPromise = new Promise<string | ArrayBuffer | null>((resolve, reject) => {
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
        this.addressPicked = true;
        this.eventForm.get("place")?.reset();
        this.eventForm.patchValue({ place: place });
    }

    displayError(formControlName: string) {
        const control = this.eventForm.get(formControlName);
        if (!control) {
            return "";
        }

        if (control.invalid && (control.dirty || control.touched)) {
            return "is-danger";
        }
        return "";
    }

    async onSubmit() {
        if (this.eventForm.invalid) {
            this.markFormGroupTouched(this.eventForm);
            if (this.isOffline) {
                this.markFormGroupTouched(this.eventForm.get("place") as FormGroup);
            }
            this.toastr.error("Please fill in all required fields.");
            return;
        }

        const communityEvent = this.eventForm.value;
        if (this.isOffline) {
            communityEvent.onlineDetails = null;
        } else {
            communityEvent.place = null;
        }

        const hasPrice = !!this.eventForm.get("price")?.value;
        if (!hasPrice) {
            communityEvent.price = null;
            communityEvent.currency = null;
        }

        this.submitting = true;

        this.eventService.create(communityEvent).subscribe(x => {
            this.eventSubmitted = true;
            
            setTimeout(() => {
                this.router.navigate([...this.redirectLink, x.id]);
            }, 2 * 1000);            
        }, error => {
            this.submitting = false;
            console.log(error);
            this.toastr.error("Something went wrong. If this persists, please contact us.");
        });
    }

    markFormGroupTouched(formGroup: FormGroup) {
        Object.values(formGroup.controls).forEach((control: AbstractControl<any, any>) => {
            control.markAsTouched();
        });
    }

    requiredDateValidator(control: FormControl) {
        return (control.value && control.value !== "") ? null : { required: true };
    }

    requiredIfOffline(control: FormControl) {
        const eventForm = control.parent;
        if (!eventForm) {
            return null;
        }

        const isOffline = eventForm.get("isOffline")?.value;
        const value = control.value;
        if (isOffline) {
            return (value && value !== "") ? null : { required: true };
        }
        return null;
    }

    requiredIfOnline(control: FormControl) {
        const eventForm = control.parent;
        if (!eventForm) {
            return null;
        }
        const isOffline = eventForm.get("isOffline")?.value;
        const value = control.value;

        if (!isOffline) {
            return (value && value !== "") ? null : { required: true };
        }
        return null;
    }

    endsAfterStartDateValidator(control: FormControl) {
        const eventForm = control.parent;
        if (!eventForm) {
            return null;
        }
        const startValue = eventForm.get("startsAt")?.value;
        if (!startValue || startValue == "") {
            return null;
        }

        const start = new Date(startValue);
        const end = new Date(control.value);
        return (start < end) ? null : { endsAfterStartDate: true };
    }
}
