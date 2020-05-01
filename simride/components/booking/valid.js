import * as Datetime from "react-datetime";
import * as moment from 'moment';

export const valid = (current) => {
    let yesterday = Datetime.moment().subtract(1, 'day');
    return current.isAfter(yesterday);
}