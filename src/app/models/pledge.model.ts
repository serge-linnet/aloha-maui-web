export class Pledge {
    country!: string;
    city?: string;
    activity?: string;
    numberOfPeople!: number;
    name!: string;
}

export class PledgeTotals {
    country!: string;
    people!: number;
    pledges!: number;
}