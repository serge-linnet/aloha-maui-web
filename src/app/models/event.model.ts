import { Place } from "src/app/models/place.model";

export const EVENT_STATUS_PENDING = 0;
export const EVENT_STATUS_APPROVED = 1;

export class Event {
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
}
