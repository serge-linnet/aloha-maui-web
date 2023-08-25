export class Place {
    placeName?: string;
    address?: string;
    postcode?: string;
    locality?: string;
    region?: string;
    country?: string;
    latitude?: number;
    longitude?: number;
    metadata?: {
        googlePlaceId?: string
        googleFormattedAddress?: string
    }
}