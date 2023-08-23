import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { DonationsComponent } from "./pages/donations/donations.component";
import { GetInvolvedComponent } from "./pages/get-involved/get-involved.component";
import { EventsComponent } from "./pages/events/events.component";
import { SubmitEventComponent } from "./pages/submit-event/submit-event.component";
import { EventDetailsComponent } from "./pages/event-details/event-details.component";
import { ManageEventsComponent } from "./pages/admin/manage-events/manage-events.component";
import { ManageEventDetailsComponent } from "./pages/admin/manage-event-details/manage-event-details.component";
import { NewsMediaComponent } from "./pages/news-media/news-media.component";

const ADMIN = "Admin";

const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "donations", component: DonationsComponent },
    { path: "get-involved", component: GetInvolvedComponent },
    { path: "news-and-media", component: NewsMediaComponent },

    { path: "events", component: EventsComponent },
    { path: "events/:id", component: EventDetailsComponent },
    { path: "submit-event", component: SubmitEventComponent },

    { path: "admin/manage-events", component: ManageEventsComponent, data: { role: ADMIN } },
    { path: "admin/manage-events/:id", component: ManageEventDetailsComponent, data: { role: ADMIN } },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: "enabled" })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
