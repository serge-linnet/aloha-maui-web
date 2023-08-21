import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";

@Component({
    selector: "app-address-autocomplete",
    templateUrl: "./address-autocomplete.component.html",
    styleUrls: ["./address-autocomplete.component.less"]
})
export class AddressAutocompleteComponent implements OnInit{
    
    @ViewChild("input") 
    input?: ElementRef<HTMLInputElement>;

    text: string = "";

    ngOnInit(): void {
    }
}
