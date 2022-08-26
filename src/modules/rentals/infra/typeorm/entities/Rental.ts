import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("rentals")
class Rental {
    @PrimaryColumn()
    id: string;
    car_id: string;
    user_id: string;
    start_date: Date;
    end_date: Date;
    expected_return_date: Date;
    total: number;
    created_at: Date;
    updated_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
        }
    }
}

export { Rental };
