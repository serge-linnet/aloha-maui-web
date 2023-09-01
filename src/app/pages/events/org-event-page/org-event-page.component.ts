import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { OrgEvent, OrgEventTotals } from 'src/app/models/org-event.model';
import { OrgEventService } from 'src/app/services/org-event.service';
import { COUNTRIES } from 'src/app/static/countries';
import { ORG_TYPES } from './org-type.content';

@Component({
    selector: 'app-org-event-page',
    templateUrl: './org-event-page.component.html',
    styleUrls: ['./org-event-page.component.scss']
})
export class OrgEventPageComponent implements OnInit {
    countries = COUNTRIES;
    filteredCountries: { name: string, code: string }[] = [];
    orgEvents: OrgEvent[] = []
    loading = false;
    totals: OrgEventTotals[] = [];
    orgTypes = ORG_TYPES;

    constructor(private formBuilder: FormBuilder, private orgEventSerivce: OrgEventService, private tstr: ToastrService) { }

    form = this.formBuilder.group({
        country: [{ name: "", code: "" }, Validators.required],
        city: ['', Validators.required],
        orgType: ['', Validators.required],
        groupName: ['', Validators.required],
        numberOfPeople: [1, Validators.required]
    });

    ngOnInit(): void {
        this.filteredCountries.push(...COUNTRIES);
        this.orgEventSerivce.findAll().subscribe(res => this.orgEvents = res);
        this.orgEventSerivce.findTotals().subscribe(totals => {
            this.totals = totals;
            console.log(totals);
        });
    }

    get totalOrgEvents() {
        return this.totals.reduce((acc, curr) => acc + curr.pledges, 0);
    }

    get totalCountries() {
        return this.totals.length;
    }

    filterCountries(event: { query: string }) {
        let filtered: any[] = [];
        let query = event.query;
        for (let i = 0; i < this.countries.length; i++) {
            let country = this.countries[i];
            if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(country);
            }
        }
        this.filteredCountries = filtered;
    }

    submit() {
        if (!this.form.valid) {
            this.tstr.error('Please fill in all the required fields');
            return;
        }

        const OrgEvent = { ... this.form.value, country: this.form.value.country?.name } as OrgEvent;
        console.log(this.form.value, OrgEvent);

        this.loading = true;
        this.orgEventSerivce.create(OrgEvent).subscribe(() => {
            this.form.reset();
            this.tstr.success('Event created successfully');
            this.orgEvents.unshift(OrgEvent);
            this.loading = false;
        },
            () => {
                this.tstr.error('Something went wrong');
                this.loading = false;
            },
            () => this.loading = false);
    }
}

