interface IDateProvider {
    compare(
        start_date: Date,
        end_date: Date,
        unit:
            | "milliseconds"
            | "seconds"
            | "minutes"
            | "hours"
            | "days"
            | "months"
            | "years"
    ): number;
    addDays(days: number): Date;
}

export { IDateProvider };
