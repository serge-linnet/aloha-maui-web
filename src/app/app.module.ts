import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./pages/home/home.component";
import { DonationsComponent } from "./pages/donations/donations.component";
import { GetInvolvedComponent } from "./pages/get-involved/get-involved.component";
import { EventsComponent } from "./pages/events/events.component";
import { SectionComponent } from "./shared/section/section.component";
import { ContainerComponent } from "./shared/container/container.component";
import { NavigationComponent } from "./layout/navigation/navigation.component";
import { SubmitEventComponent } from "./pages/submit-event/submit-event.component";
import { NgxSimpleTextEditorModule } from "ngx-simple-text-editor";
import { AddressAutocompleteComponent } from "./shared/address-autocomplete/address-autocomplete.component";
import { SubmitEventFormComponent } from "./features/events/submit-event-form/submit-event-form.component";


@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        DonationsComponent,
        GetInvolvedComponent,
        EventsComponent,
        SectionComponent,
        ContainerComponent,
        NavigationComponent,
        SubmitEventComponent,
        AddressAutocompleteComponent,
        SubmitEventFormComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        NgxSimpleTextEditorModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
