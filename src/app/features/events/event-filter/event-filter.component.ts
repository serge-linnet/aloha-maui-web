import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { EventService } from 'src/app/services/event.service';
import { COUNTRIES } from 'src/app/static/countries';

@Component({
    selector: 'app-event-filter',
    templateUrl: './event-filter.component.html',
    styleUrls: ['./event-filter.component.scss']
})
export class EventFilterComponent implements OnInit {

    @Output() filterChanged = new EventEmitter<any>();

    countries: MenuItem[] = []
    types: MenuItem[] = []

    filter: Filter = {}

    constructor(private eventService: EventService) {

    }

    ngOnInit(): void {
        this.eventService.findAllEventCountries().subscribe((countries) => {
            const eventCountries = countries
                .map((countryCode) => {
                    const country = COUNTRIES.find((c) => c.code === countryCode)
                    const countryName = !country ? countryCode : country.name
                    return { label: countryName, value: countryCode }
                })
                .sort((a, b) => a.label.localeCompare(b.label))

            const filterCountries = [{ label: "Any Country" }, ...eventCountries]

            this.countries = filterCountries
                .map((country) => {
                    return {
                        label: country.label,
                        command: (e) => {
                            this.updateFilter({ country })
                        }
                    }
                });
        });

        const types = [{ label: "Any Type" }, { label: "In Person", value: "OFFLINE" }, { label: "Online", value: "ONLINE" }]
        this.types = types.map((type) => {
            return {
                label: type.label,
                command: (e) => {
                    this.updateFilter({ type })
                }
            }
        });
    }

    getFilterButtonClass(value?: string) {
        if (value) {
            return "p-button-rounded"
        }
        return "p-button-rounded p-button-outlined"
    }

    updateFilter(value: any) {
        const valueKeys = Object.keys(value)
        let shouldUpdate = false
        valueKeys.forEach((key) => {
            const filter = this.filter as any
            if (filter[key] !== value[key]) {
                shouldUpdate = true
            }
        });
        this.filter = { ...this.filter, ...value }
        if (shouldUpdate) {
            this.onFilterChanged()
        }
    }

    reset() {
        Object.keys(this.filter).forEach((key) => {
            (this.filter as any)[key] = undefined
        });
        this.onFilterChanged()
    }

    onFilterChanged() {
        let filter: any = {}
        Object.keys(this.filter).forEach((key) => {
            const value = (this.filter as any)[key]
            filter[key] = value.value
        });
        this.filterChanged.emit(filter)
    }
}

type SelectedFilter = {
    label: string,
    value?: any
}

type Filter = {
    country?: SelectedFilter,
    type?: SelectedFilter
}