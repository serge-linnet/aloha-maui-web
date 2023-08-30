export class OrgEvent {
    country!: string;
    city?: string;
    orgType?: string;
    groupName?: string;
    numberOfPeople!: number;
}

export class OrgEventTotals {
    country!: string;
    people!: number;
    events!: number;
}