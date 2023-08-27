import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { DonationsComponent } from "./pages/donations/donations.component";
import { GetInvolvedComponent } from "./pages/get-involved/get-involved.component";
import { EventsPageComponent } from "./pages/events/events-page/events-page.component";
import { SubmitEventComponent } from "./pages/submit-event-page/submit-event.component";
import { EventDetailsPageComponent } from "./pages/events/event-details-page/event-details-page.component";
import { ManageEventsComponent } from "./pages/admin/manage-events/manage-events.component";
import { ManageEventDetailsComponent } from "./pages/admin/manage-event-details/manage-event-details.component";
import { NewsMediaComponent } from "./pages/news-media/news-media.component";
import { MyEventsComponent } from "./pages/my-events/my-events.component";
import { SignInPageComponent } from "./pages/auth/sign-in-page/sign-in-page.component";
import { SignUpPageComponent } from "./pages/auth/sign-up-page/sign-up-page.component";

const ADMIN = "Admin";

const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "donate", component: DonationsComponent },
    { path: "get-involved", component: GetInvolvedComponent },
    { path: "news-and-media", component: NewsMediaComponent },

    { path: "sign-in", component: SignInPageComponent },
    { path: "sign-up", component: SignUpPageComponent },

    { path: "events", component: EventsPageComponent },    
    { path: "events/create", component: SubmitEventComponent },
    { path: "events/:id", component: EventDetailsPageComponent },
    { path: "user/my-events", component: MyEventsComponent },
    { path: "user/my-events/:id", component: EventDetailsPageComponent },

    { path: "admin/manage-events", component: ManageEventsComponent, data: { role: ADMIN } },
    { path: "admin/manage-events/:id", component: ManageEventDetailsComponent, data: { role: ADMIN } },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: "enabled" })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
