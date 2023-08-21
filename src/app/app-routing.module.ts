import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { DonationsComponent } from "./pages/donations/donations.component";
import { GetInvolvedComponent } from "./pages/get-involved/get-involved.component";
import { EventsComponent } from "./pages/events/events.component";
import { SubmitEventComponent } from "./pages/submit-event/submit-event.component";

const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "donations", component: DonationsComponent },
    { path: "get-involved", component: GetInvolvedComponent },
    { path: "events", component: EventsComponent },
    { path: "submit-event", component: SubmitEventComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
