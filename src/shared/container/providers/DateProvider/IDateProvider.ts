interface IDateProvider {
    compareInHours(start_date: Date, end_date: Date): number;
}

export { IDateProvider };
