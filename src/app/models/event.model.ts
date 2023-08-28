import { Place } from "src/app/models/place.model";

export const EVENT_STATUS_PENDING = 0;
export const EVENT_STATUS_APPROVED = 1;
export const EVENT_STATUS_REJECTED = 2;

export class CommunityEvent {
    id!: string;
    title?: string;
    description?: string;
    category?: string;
    price?: number;
    currency?: string = "USD";
    photoUrl?: string;
    startsAt?: Date;
    endsAt?: Date;
    place?: Place;
    status?: number;
    assets?: EventAssets;
    contacts? : EventContacts;
}

export class EventAssets {
    coverPhoto?: string;
    thumbnail?: string;
}

export class EventContacts {
    contactEmail!: string;
    contactPhone?: string;
    instagram?: string;
    facebook?: string;    
    website?: string;
}