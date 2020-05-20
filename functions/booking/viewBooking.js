// view the booking clicked
viewBooking((e) => {
    document.getElementById('td_viewSelectedBooking_currPassengers').innerHTML = null;
    document.getElementById('td_viewSelectedBooking_bookingID').innerHTML = null;
    document.getElementById('td_viewSelectedBooking_driverName').innerHTML = null;
    document.getElementById('td_viewSelectedBooking_date').innerHTML = null;
    document.getElementById('td_viewSelectedBooking_area').innerHTML = null;
    document.getElementById('td_viewSelectedBooking_towards').innerHTML = null;
    document.getElementById('td_viewSelectedBooking_slotsLeft').innerHTML = null;

    var bookingID = e.target.parentElement.parentElement.id;

    document.getElementById('div_availBookings').style.display = "none";
    document.getElementById('div_createBooking').style.display = "none";
    document.getElementById('div_myBookings').style.display = "none";
    document.getElementById('div_viewSelectedBooking').style.display = "block";
    document.getElementById('div_viewCreatedBooking').style.display = "none";

    // get all accounts
    db.ref('accounts')
        .orderByChild('email')
        .once('value')
        .then((snapshot) => {
            var i = 0;
            snapshot.forEach((child) => {
                userDetails[i] = child.key + ":" + child.val().uname + ":" + child.val().fname + ":" + child.val().lname;
                i++;
            })
        });

    const database = db.ref('bookings');
    database.once('value', (snapshot) => {
        if (snapshot.exists()) {
            snapshot.forEach((data) => {
                if (data.key === bookingID) {
                    let area = data.val().area;
                    let date = moment.unix(data.val().date / 1000).format("DD MMM YYYY hh:mm a");
                    let towards = data.val().towards;
                    payMethod = data.val().payMethod;
                    PostalCode = data.val().postal;
                    let ppl = [];
                    let pay = [];
                    let meet = [];

                    if (data.val().currPassengers !== "") {
                        ppl = data.val().currPassengers.split(', ');
                        pay = payMethod.split(', ');
                        meet = PostalCode.split(', ');
                    }

                    let slotsleft = data.val().maxPassengers - ppl.length;
                    let id = data.val().driverID;
                    let driver = '';

                    for (let i = 0; i < userDetails.length; i++) {
                        let key = [];
                        key = userDetails[i].split(':');
                        if (key[0] === id) {
                            driver = key[1]; // gets username
                        }
                    }

                    console.log(user[6].toLowerCase() === "yes", id, user[9], id === user[9], ppl.includes(user[2]), slotsleft > 0)
                    document.getElementById('td_viewSelectedBooking_bookingID').innerHTML = bookingID;
                    document.getElementById('td_viewSelectedBooking_driverName').innerHTML = driver;
                    document.getElementById('td_viewSelectedBooking_date').innerHTML = date;
                    document.getElementById('td_viewSelectedBooking_area').innerHTML = area;
                    document.getElementById('td_viewSelectedBooking_towards').innerHTML = towards;
                    document.getElementById('td_viewSelectedBooking_slotsLeft').innerHTML = slotsleft;

                    if (user[6].toLowerCase() === "yes") { // admin
                        document.getElementById('btnJoinBooking').style.display = "none";
                        document.getElementById('btnCancelBooking').style.display = "none";
                        document.getElementById('btnDeleteBooking').style.display = "none";
                        document.getElementById('btnRemovePassenger').style.display = "none";
                        document.getElementById('btnConfirmRemovePassenger').style.display = "none";
                        document.getElementById('tbl_removePassengerExtend').style.display = "none";
                    } else {
                        if (driver === user[2]) { // owner of booking and not admin
                            document.getElementById('btnJoinBooking').style.display = "none";
                            document.getElementById('btnCancelBooking').style.display = "none";
                            document.getElementById('btnDeleteBooking').style.display = "inline-block";
                            document.getElementById('btnRemovePassenger').style.display = "inline-block";
                            document.getElementById('btnConfirmRemovePassenger').style.display = "none";
                            document.getElementById('tbl_removePassengerExtend').style.display = "none";
                        } else {
                            if (ppl.includes(user[2])) { // if already joined booking, not owner of booking and not admin
                                document.getElementById('btnJoinBooking').style.display = "none";
                                document.getElementById('btnCancelBooking').style.display = "inline-block";
                                document.getElementById('btnDeleteBooking').style.display = "none";
                                document.getElementById('btnRemovePassenger').style.display = "none";
                                document.getElementById('btnConfirmRemovePassenger').style.display = "none";
                                document.getElementById('tbl_removePassengerExtend').style.display = "none";
                            } else {
                                if (slotsleft > 0) { // if not full, not joined booking, not owner of booking and not admin
                                    document.getElementById('btnJoinBooking').style.display = "inline-block";
                                    document.getElementById('btnCancelBooking').style.display = "none";
                                    document.getElementById('btnDeleteBooking').style.display = "none";
                                    document.getElementById('btnRemovePassenger').style.display = "none";
                                    document.getElementById('btnConfirmRemovePassenger').style.display = "none";
                                    document.getElementById('tbl_removePassengerExtend').style.display = "none";
                                } else { // if full, not joined booking, not owner of booking and not admin
                                    document.getElementById('btnJoinBooking').style.display = "none";
                                    document.getElementById('btnCancelBooking').style.display = "none";
                                    document.getElementById('btnDeleteBooking').style.display = "none";
                                    document.getElementById('btnRemovePassenger').style.display = "none";
                                    document.getElementById('btnConfirmRemovePassenger').style.display = "none";
                                    document.getElementById('tbl_removePassengerExtend').style.display = "none";
                                }
                            }
                        }
                    }

                    if (ppl.length > 0) {
                        document.getElementById('td_viewSelectedBooking_currPassengers').innerHTML = "";
                        if (driver === user[2]) {
                            for (let ct = 0; ct < ppl.length; ct++) {
                                document.getElementById('td_viewSelectedBooking_currPassengers').innerHTML += ppl[ct] + " (Pick-Up Point: " + meet[ct] + ", Paying By: " + pay[ct] + ") <br/>";
                            }
                            document.getElementById('tr_viewSelectedBooking_currPassengers').style.visibility = "visible";
                        } else {
                            document.getElementById('td_viewSelectedBooking_currPassengers').innerHTML = data.val().currPassengers;
                            document.getElementById('tr_viewSelectedBooking_currPassengers').style.visibility = "visible";
                        }
                    } else {
                        document.getElementById('tr_viewSelectedBooking_currPassengers').style.visibility = "hidden";
                    }
                }
            });
        }
    });
})

module.exports.viewBooking = viewBooking;