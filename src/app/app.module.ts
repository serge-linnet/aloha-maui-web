import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";

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
import { EventListComponent } from "./features/events/event-list/event-list.component";
import { SearchEventFormComponent } from "./features/events/search-event-form/search-event-form.component";
import { EventDetailsComponent } from "./pages/event-details/event-details.component";
import { ManageEventsComponent } from "./pages/admin/manage-events/manage-events.component";
import { ManageEventDetailsComponent } from "./pages/admin/manage-event-details/manage-event-details.component";
import { AuthInterceptor } from "./auth.interceptor";
import { NewsMediaComponent } from './pages/news-media/news-media.component';
import { NewsCardComponent } from './features/news/news-card/news-card.component';
import { LoginComponent } from "./features/auth/login/login.component";
import { MyEventsComponent } from './pages/my-events/my-events.component';
import { ValidationErrorsComponent } from './shared/validation-errors/validation-errors.component';
import { ToastrModule } from "ngx-toastr";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
        SubmitEventFormComponent,
        EventListComponent,
        SearchEventFormComponent,
        EventDetailsComponent,
        ManageEventsComponent,
        ManageEventDetailsComponent,
        NewsMediaComponent,
        NewsCardComponent,
        LoginComponent,
        MyEventsComponent,
        ValidationErrorsComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        NgxSimpleTextEditorModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot()
    ],
    providers: [{
        provide: HTTP_INTERCEPTORS, 
        useClass: AuthInterceptor, 
        multi: true
      }],
    bootstrap: [AppComponent]
})
export class AppModule { }
