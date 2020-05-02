import * as Datetime from "react-datetime";

export const valid = (current) => {
    let yesterday = Datetime.moment().subtract(1, 'day');
    return current.isAfter(yesterday);
}