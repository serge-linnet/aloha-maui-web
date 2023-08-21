import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Observable, of } from "rxjs";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.less"]
})
export class AppComponent implements OnInit {
    title = "maui-ui";

    events: Event[] = []

    constructor(private http: HttpClient) {

    }

    async ngOnInit(): Promise<void> {
        this.events = (await this.http.get<Event[]>("https://localhost:7194/events").toPromise()) ?? [];
    }
}

interface Event {
    title: string
    description: string
    startDateUtc: Date
    endDateUtc: Date    
}