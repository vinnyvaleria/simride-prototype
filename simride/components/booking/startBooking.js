var bookingID

export const startBooking = (e) => {
    document.getElementById('maps').innerHTML
    document.getElementById('bookPage').style.display='none';
    document.getElementById('maps').style.display = 'block';

    bookingID = e.target.parentElement.parentElement.id;

    return bookingID;
}

export const getBookingID = () => {
    return bookingID;
}