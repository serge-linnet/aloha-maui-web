import { Component, Input, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { CommunityEvent } from 'src/app/models/event.model';
import { environment } from 'src/environments/environment';

type EventMarker = {
    event: CommunityEvent;
    marker: mapboxgl.Marker;
    selected?: boolean;
}

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
    @Input()
    events: CommunityEvent[] = [];

    eventMarkers: EventMarker[] = [];

    map?: mapboxgl.Map;
    style = 'mapbox://styles/mapbox/streets-v11';

    constructor() { }

    ngOnInit() {

        // @ts-ignore
        mapboxgl.accessToken = environment.mapBoxToken;

        this.map = new mapboxgl.Map({
            container: 'map',
            style: this.style,
            zoom: 7
        });

        this.map.on('load', () => {
            this.map!.resize();
        });
    }

    ngOnChanges() {
        if (!this.map) {
            return;
        }

        this.map?.setCenter([this.events[0].place!.longitude!, this.events[0].place!.latitude!]);
        this.eventMarkers = this.events
            .filter(event => event.place?.longitude && event.place?.latitude)
            .map(event => {

                let el = document.createElement('i');
                el.className = 'fas fa-map-marker-alt map-marker';

                let eventMarker: EventMarker = { event } as EventMarker;
                const marker = new mapboxgl.Marker(el)
                    .setLngLat([event.place!.longitude!, event.place!.latitude!])
                    .addTo(this.map!);
                marker.getElement().addEventListener('click', () => {
                    eventMarker.selected = !eventMarker.selected;
                    marker.getElement().classList.toggle('map-marker--selected');
                    this.eventMarkers.forEach(em => {
                        if (em.event.id !== eventMarker.event.id) {
                            em.selected = false;
                            em.marker.getElement().classList.remove('map-marker--selected');
                        }
                    });

                });

                eventMarker.marker = marker;

                return eventMarker;
            });

        if (this.eventMarkers.length == 0) {
            return;
        }

        const bounds = new mapboxgl.LngLatBounds(
            this.eventMarkers[0]!.marker.getLngLat(),
            this.eventMarkers[0]!.marker.getLngLat()
        );

        this.eventMarkers.forEach(em => {
            bounds.extend(em.marker.getLngLat());
        });

        this.map.fitBounds(bounds, {
            padding: 10
        });
    }

    getEventPopup(event: CommunityEvent): string {
        return `
    <div class="card mb-3">
        <div class="card-content event-card">
            <div class="content">
                <div class="event-card__sections">
                    <div class="event-card__thumbnail">
                        <img src="${event.assets?.thumbnail}" />
                    </div>
                    <div class="event-card__about-section">
                        <p class="title is-4">${event.title}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
        `
    }
}