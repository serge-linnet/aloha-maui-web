import { Component, OnInit } from '@angular/core';
import { COUNTRIES } from 'src/app/static/countries';
import { SUGGESTIONS } from './suggestions.content';
import { FormBuilder, Validators } from '@angular/forms';
import { IDEAS } from './ideas.content';
import { PledgeService } from 'src/app/services/pledge.service';
import { Pledge, PledgeTotals } from 'src/app/models/pledge.model';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-pledge-a-moment',
    templateUrl: './pledge-a-moment.component.html',
    styleUrls: ['./pledge-a-moment.component.scss']
})
export class PledgeAMomentComponent implements OnInit {
    ideas = IDEAS;
    countries = COUNTRIES;
    filteredCountries: { name: string, code: string }[] = [];
    suggestions = SUGGESTIONS;
    filteredSuggestions: string[] = [];
    pledges: Pledge[] = []
    loading = false;
    totals: PledgeTotals[] = [];

    constructor(private formBuilder: FormBuilder, private pledgeSerivce: PledgeService, private tstr: ToastrService) { }

    form = this.formBuilder.group({
        name: ['', Validators.required],
        country: [{ name: "", code: "" }, Validators.required],
        city: ['', Validators.required],
        activity: ['', Validators.required],
        numberOfPeople: [1, Validators.required]
    });

    ngOnInit(): void {
        this.filteredCountries.push(...COUNTRIES);
        this.filteredSuggestions.push(...SUGGESTIONS);
        this.pledgeSerivce.findAll().subscribe(pledges => this.pledges = pledges);

        this.pledgeSerivce.findTotals().subscribe(totals => {
            this.totals = totals;
        });
    }

    get totalPeople() {
        return this.totals.reduce((acc, curr) => acc + curr.people, 0);
    }

    get totalPledges() {
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

    filterSuggestions(event: { query: string }) {
        let filtered: any[] = [];
        let query = event.query;
        for (let i = 0; i < this.suggestions.length; i++) {
            let suggestion = this.suggestions[i];

            if (suggestion.toLowerCase().indexOf(query.toLowerCase()) >= 0) {
                filtered.push(suggestion);
            }
        }
        this.filteredSuggestions = filtered;
    }

    submit() {
        if (!this.form.valid) {
            this.tstr.error('Please fill in all the required fields');
            return;
        }

        const pledge = { ... this.form.value, country: this.form.value.country?.name } as Pledge;
        console.log(this.form.value, pledge);

        this.loading = true;
        this.pledgeSerivce.create(pledge).subscribe(() => {
            this.form.reset();
            this.tstr.success('Pledge created successfully');
            this.pledges.unshift(pledge);
            this.loading = false;
        }, 
        () => {
            this.tstr.error('Something went wrong');
            this.loading = false;
        }, 
        () => this.loading = false);
    }
}

