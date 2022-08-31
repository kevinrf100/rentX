import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { IDateProvider } from "../IDateProvider";

dayjs.extend(utc);

class DayjsDateProvider implements IDateProvider {
    compare(start_date: Date, end_date: Date, format): number {
        const formattedStartDate = this.convertToUTC(start_date);
        const formattedEndDate = this.convertToUTC(end_date);
        return dayjs(formattedEndDate).diff(formattedStartDate, format);
    }

    convertToUTC(date: Date): string {
        return dayjs(date).utc().local().format();
    }

    addDays(days: number): Date {
        return dayjs().add(days, "days").toDate();
    }
}

export { DayjsDateProvider };
