import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS, HttpClientModule, HttpRequest } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./pages/home/home.component";
import { DonationsComponent } from "./pages/donations/donations.component";
import { GetInvolvedComponent } from "./pages/get-involved/get-involved.component";
import { EventsPageComponent } from "./pages/events/events-page/events-page.component";
import { SectionComponent } from "./shared/section/section.component";
import { ContainerComponent } from "./shared/container/container.component";
import { NavigationComponent } from "./layout/navigation/navigation.component";
import { SubmitEventComponent } from "./pages/submit-event-page/submit-event.component";
import { NgxSimpleTextEditorModule } from "ngx-simple-text-editor";
import { AddressAutocompleteComponent } from "./shared/address-autocomplete/address-autocomplete.component";
import { SubmitEventFormComponent } from "./features/events/submit-event-form/submit-event-form.component";
import { EventListComponent } from "./features/events/event-list/event-list.component";
import { SearchEventFormComponent } from "./features/events/search-event-form/search-event-form.component";
import { EventDetailsPageComponent } from "./pages/events/event-details-page/event-details-page.component";
import { ManageEventsComponent } from "./pages/admin/manage-events/manage-events.component";
import { ManageEventDetailsComponent } from "./pages/admin/manage-event-details/manage-event-details.component";
import { AuthInterceptor } from "./auth.interceptor";
import { NewsMediaComponent } from "./pages/news-media/news-media.component";
import { MyEventsComponent } from "./pages/my-events/my-events.component";
import { ValidationErrorsComponent } from "./shared/validation-errors/validation-errors.component";
import { ToastrModule } from "ngx-toastr";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { EventFullDetailsComponent } from "./features/events/event-full-details/event-full-details.component";
import { MyEventDetailsPageComponent } from "./pages/events/my-event-details-page/my-event-details-page.component";
import { EventStatusFormComponent } from "./features/events/event-status-form/event-status-form.component";
import { SignInPageComponent } from "./pages/auth/sign-in-page/sign-in-page.component";
import { CharityCardComponent } from "./features/donations/charity-card/charity-card.component";
import { EventCardComponent } from "./features/events/event-card/event-card.component";
import { ModalComponent } from "./shared/modal/modal.component";
import { SpinnerComponent } from "./shared/spinner/spinner.component";
import { GalleryModule } from "ng-gallery";
import { SignUpPageComponent } from './pages/auth/sign-up-page/sign-up-page.component';
import { CarouselModule } from 'primeng/carousel';
import { CreateEventPageComponent } from './pages/events/create-event-page/create-event-page.component';
import { ComingSoonComponent } from './pages/coming-soon/coming-soon.component';
import { JwtModule } from "@auth0/angular-jwt";
import { environment } from "src/environments/environment";
import { tokenGetter } from "./services/auth.service";
import { WhatsOnComponent } from './pages/events/whats-on/whats-on.component';
import { ButtonModule } from 'primeng/button';
import { EditEventPageComponent } from './pages/events/edit-event-page/edit-event-page.component';
import { PledgeMomentComponentPage } from './pages/events/pledge-a-moment/pledge-a-moment.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { AccordionModule } from 'primeng/accordion';
import { OrgEventPageComponent } from './pages/events/org-event-page/org-event-page.component';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        DonationsComponent,
        GetInvolvedComponent,
        EventsPageComponent,
        SectionComponent,
        ContainerComponent,
        NavigationComponent,
        SubmitEventComponent,
        AddressAutocompleteComponent,
        SubmitEventFormComponent,
        EventListComponent,
        SearchEventFormComponent,
        EventDetailsPageComponent,
        ManageEventsComponent,
        ManageEventDetailsComponent,
        NewsMediaComponent,
        MyEventsComponent,
        ValidationErrorsComponent,
        EventFullDetailsComponent,
        MyEventDetailsPageComponent,
        EventStatusFormComponent,
        SignInPageComponent,
        CharityCardComponent,
        EventCardComponent,
        ModalComponent,
        SpinnerComponent,
        SignUpPageComponent,
        CreateEventPageComponent,
        ComingSoonComponent,
        WhatsOnComponent,
        EditEventPageComponent,
        PledgeMomentComponentPage,
        OrgEventPageComponent,
    ],
    imports: [
        HttpClientModule,
        JwtModule.forRoot({
            config: {
                tokenGetter: tokenGetter,
                allowedDomains: [environment.apiDomain],
                disallowedRoutes: []
            }
        }),
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgxSimpleTextEditorModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        GalleryModule,
        CarouselModule,
        ButtonModule,
        AutoCompleteModule,
        InputTextModule,
        InputNumberModule,
        AccordionModule,
        DropdownModule
    ],
    providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
    }],
    bootstrap: [AppComponent]
})
export class AppModule { }


