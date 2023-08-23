import { Injectable, OnInit } from "@angular/core";
import { ConfigService } from "./config.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Event } from "src/app/models/event.model";

@Injectable({
    providedIn: "root"
})
export class EventService {

    constructor(private configService: ConfigService, private http: HttpClient) {

    }

    findEvents(): Observable<Event[]> {
        const config = this.configService.getConfig();
        return this.http.get<Event[]>(`${config.apiUrl}/events`, { params: { query: "" } });
    }

    findPendingEvents(): Observable<Event[]> {
        const config = this.configService.getConfig();
        return this.http.get<Event[]>(`${config.apiUrl}/events/pending`, { withCredentials: true });
    }

    getEvent(id: string): Observable<Event> {
        const config = this.configService.getConfig();
        return this.http.get<Event>(`${config.apiUrl}/events/${id}/details`);
    }
}
