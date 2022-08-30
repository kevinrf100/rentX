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
}

export { IDateProvider };
