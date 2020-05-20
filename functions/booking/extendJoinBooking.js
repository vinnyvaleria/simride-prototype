extendJoinBooking(() => {
    document.getElementById('btnSubmitJoinBooking').style.display = "inline-block";
    document.getElementById('tbl_viewSelectedBooking_ExtendBooking').style.display = "block";
    document.getElementById('btnJoinBooking').style.display = "none";
})

module.exports.extendJoinBooking = extendJoinBooking;