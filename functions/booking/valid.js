import * as Datetime from "react-datetime";
var moment = require('moment');

valid((current) => {
    let yesterday = Datetime.moment().subtract(1, 'day');
    return current.isAfter(yesterday);
})

module.exports.valid = valid;