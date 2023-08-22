import { Place } from "src/app/shared/address-autocomplete/place";

export class Event {
    title?: string;
    description?: string;
    category?: string;
    price?: number;
    currency?: string = "USD";
    photoUrl?: string;
    startsAt?: Date;
    endsAt?: Date;
    place?: Place;
}