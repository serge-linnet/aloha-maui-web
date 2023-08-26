/// <reference types="@types/googlemaps" />
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, NgZone, OnInit, Output, ViewChild } from "@angular/core";
import { Place } from "../../models/place.model";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
    selector: "app-address-autocomplete",
    templateUrl: "./address-autocomplete.component.html",
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: AddressAutocompleteComponent
        }
    ]
})
export class AddressAutocompleteComponent implements OnInit, AfterViewInit, ControlValueAccessor {
    @ViewChild("input") inputElement?: ElementRef<HTMLInputElement>;
    @Output() placeChanged = new EventEmitter<Place>();

    constructor(private ngZone: NgZone) { }

    query = "";
    onChange = (_: Place) => { };
    onTouched = () => { };

    ngOnInit(): void {
    }

    ngAfterViewInit() {
        this.getPlaceAutocomplete();
    }

    writeValue(obj: any): void {
        // no-op, control does not support writing
    }

    registerOnChange(onChange: any): void {
        this.onChange = onChange;
    }

    registerOnTouched(onTouched: any) {
        this.onTouched = onTouched;
    }

    setDisabledState?(isDisabled: boolean): void {
        // no-op
    }

    private getPlaceAutocomplete() {
        const autocomplete = new google.maps.places.Autocomplete(this.inputElement!.nativeElement);
        google.maps.event.addListener(autocomplete, "place_changed", () => {
            const place = autocomplete.getPlace();

            const result = new Place();
            result.latitude = place.geometry?.location.lat();
            result.longitude = place.geometry?.location.lng();
            result.metadata = {
                googlePlaceId: place.place_id,
                googleFormattedAddress: place.formatted_address
            };

            if ((place as any).types.includes("establishment")) {
                result.placeName = place.name
            }

            place.address_components?.forEach(component => {
                const type = component.types[0];
                switch (type) {
                    case "street_number": {
                        result.address = component.long_name;
                        break;
                    }
                    case "route": {
                        if (result.address && result.address.length > 0) {
                            result.address = `${result.address} ${component.long_name}`;
                        }
                        else {
                            result.address = component.long_name;
                        }
                        break;
                    }
                    case "postal_code": {
                        result.postcode = component.long_name;
                        break;
                    }
                    case "locality": {
                        result.locality = component.long_name;
                        break;
                    }
                    case "administrative_area_level_1": {
                        result.region = component.long_name;
                        break;
                    }
                    case "country": {
                        result.country = component.short_name;
                        break;
                    }
                }
            });

            this.ngZone.run(() => {
                this.placeChanged.next(result);
                this.onChange(result);
            });
        });
    }
}
