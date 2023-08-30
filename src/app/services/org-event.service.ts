import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { OrgEvent, OrgEventTotals } from "../models/org-event.model";

@Injectable({
    providedIn: "root"
})
export class OrgEventService {
    constructor(private http: HttpClient) {

    }

    findAll(): Observable<OrgEvent[]> {
        return this.http.get<OrgEvent[]>(`${environment.apiUrl}/OrganizationEvents`);
    }

    findTotals(): Observable<OrgEventTotals[]> {
        return this.http.get<OrgEventTotals[]>(`${environment.apiUrl}/OrganizationEvents/totals`);
    }

    create(OrgEvent: OrgEvent): Observable<OrgEvent> {
        return this.http.post<OrgEvent>(`${environment.apiUrl}/OrganizationEvents`, OrgEvent);
    }
}
