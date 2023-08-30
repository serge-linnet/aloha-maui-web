import { Injectable, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CommunityEvent } from "src/app/models/event.model";
import { environment } from "src/environments/environment";
import { ManageCommunityEventsFilter } from "../models/manage-community-events-filter";
import { Pledge, PledgeTotals } from "../models/pledge.model";

@Injectable({
    providedIn: "root"
})
export class PledgeService {
    constructor(private http: HttpClient) {

    }

    findAll(): Observable<Pledge[]> {
        return this.http.get<Pledge[]>(`${environment.apiUrl}/pledges`);
    }
    
    findTotals(): Observable<PledgeTotals[]> {
        return this.http.get<PledgeTotals[]>(`${environment.apiUrl}/pledges/totals`);
    }
    
    create(pledge: Pledge): Observable<Pledge> {
        return this.http.post<Pledge>(`${environment.apiUrl}/pledges`, pledge);
    }
}
