import { Injectable, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Event } from "src/app/models/event.model";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: "root"
})
export class EventService {

    constructor(private http: HttpClient) {

    }

    findEvents(): Observable<Event[]> {
        return this.http.get<Event[]>(`${environment.apiUrl}/events`, { params: { query: "" } });
    }

    findPendingEvents(): Observable<Event[]> {
        return this.http.get<Event[]>(`${environment.apiUrl}/events/pending`, { withCredentials: true });
    }

    getEvent(id: string): Observable<Event> {
        return this.http.get<Event>(`${environment.apiUrl}/events/${id}/details`);
    }

    create(event: Event): Observable<Event> {
        return this.http.post<Event>(`${environment.apiUrl}/events`, event, { withCredentials: true });
    }
}
