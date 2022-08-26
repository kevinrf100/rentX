import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { IDateProvider } from "../IDateProvider";

dayjs.extend(utc);

class DayjsDateProvider implements IDateProvider {
    compareInHours(start_date: Date, end_date: Date): number {
        const formattedStartDate = this.convertToUTC(start_date);
        const formattedEndDate = this.convertToUTC(end_date);
        return dayjs(formattedEndDate).diff(formattedStartDate, "hours");
    }

    convertToUTC(date: Date): string {
        return dayjs(date).utc().local().format();
    }
}

export { DayjsDateProvider };
