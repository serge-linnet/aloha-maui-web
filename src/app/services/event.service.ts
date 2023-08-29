import { Injectable, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CommunityEvent } from "src/app/models/event.model";
import { environment } from "src/environments/environment";
import { ManageCommunityEventsFilter } from "../models/manage-community-events-filter";

@Injectable({
    providedIn: "root"
})
export class EventService {

    constructor(private http: HttpClient) {

    }

    findEvents(): Observable<CommunityEvent[]> {
        return this.http.get<CommunityEvent[]>(`${environment.apiUrl}/events`, { params: { query: "" } });
    }

    findPendingEvents(filter: ManageCommunityEventsFilter): Observable<CommunityEvent[]> {
        const params: any = {
            includeApproved: filter.includeApproved,
            includeRejected: filter.includeRejected
        };
        return this.http.get<CommunityEvent[]>(`${environment.apiUrl}/events/manage`, { params: params });
    }

    getEvent(id: string): Observable<CommunityEvent> {
        return this.http.get<CommunityEvent>(`${environment.apiUrl}/events/${id}/details`);
    }

    create(event: CommunityEvent): Observable<CommunityEvent> {
        return this.http.post<CommunityEvent>(`${environment.apiUrl}/events`, event, { withCredentials: true });
    }

    update(event: CommunityEvent): Observable<CommunityEvent> {
        return this.http.put<CommunityEvent>(`${environment.apiUrl}/events`, event, { withCredentials: true });
    }

    findMyEvents(): Observable<CommunityEvent[]> {
        return this.http.get<CommunityEvent[]>(`${environment.apiUrl}/events/my`);
    }

    changeStatus(id: string, status: number): Observable<CommunityEvent> {
        return this.http.put<CommunityEvent>(`${environment.apiUrl}/events/${id}/status`, { status }, { withCredentials: true });
    }
}
