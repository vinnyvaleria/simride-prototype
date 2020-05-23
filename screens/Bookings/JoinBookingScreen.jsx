import React from 'react';
import {
    ScrollView,
    View,
    Text,
    TextInput,
    Picker,
} from 'react-native';
import * as moment from 'moment';
import { bookingID, Driver, Passengers, Area, DateTime, Going, Slots } from './ViewBookingScreen';


import { GoogleApiWrapper } from "google-maps-react";
import GooglePlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import 'react-google-places-autocomplete/dist/index.min.css';

import fire from '../../config';
import 'firebase/firestore';
import 'firebase/storage';

// components
import { SubmitButton } from '../../components';
import { user } from '../Landing/StartScreen';

// styling
import { pageStyle, screenStyle } from './styles';
import icon from '../../assets/images/all-bookings.png';

class JoinBookingScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            username: '',
            phone: '',
            email: '',
            newPassword: '',
            confirmPassword: '',
            isDriver: '',
            isAdmin: '',
            id: '',
            image: null,
            frontURL: '',
            backURL: '',
            progress: 0,
            license: '',
            carplate: '',
            status: '',
            dateApplied: '',
            binded: false,
            displayPrevBooking: [],
            checkDriverStatus: [],
            bookingArea: '',
            bookingDate: '',
            bookingDriver: '',
            bookingTowards: '',
            bookingLeft: '',
            bookingPassengers: '',
            bookingID: '',
            selectPayment: 'Wallet',
            selectPoint: '',
            driver: '',
            area: '',
            datetime: '',
            going: '',
            slots: ''
        };
    }

    componentDidMount = () => {
        const emailTemp = fire.auth().currentUser.email;
        user[3] = emailTemp;
        this.state.email = user[3];
        this.bindUserData();
    }

    // bind user data
    bindUserData = () => {
        const accountsRef = fire.database().ref('accounts');
        accountsRef
            .orderByChild('email')
            .equalTo(user[3])
            .on('value', snapshot => {
                snapshot.forEach((child) => {
                    user[0] = child.val().fname;
                    user[1] = child.val().lname;
                    user[2] = child.val().uname;
                    user[4] = child.val().phone;
                    user[5] = child.val().isDriver;
                    user[6] = child.val().isAdmin;
                    user[7] = child.val().isBanned;
                    user[8] = child.val().wallet;
                    user[9] = child.key;
                    user[10] = child.val().rating;
                    user[11] = child.val().ratedBy;

                    this.setState({
                        firstName: child.val().fname,
                        lastName: child.val().lname,
                        username: child.val().uname,
                        email: child.val().email,
                        phone: child.val().phone,
                        isDriver: child.val().isDriver,
                        isAdmin: child.val().isAdmin,
                        wallet: child.val().wallet,
                        id: child.key,
                        rating: child.val().rating,
                        ratedBy: child.val().ratedBy,
                        bookingID: bookingID,
                        slots: Slots,
                        area: Area,
                        driver: Driver,
                        datetime: DateTime,
                        going: Going
                        
                    })
                });
            })
        this.setState({ binded: true });
    }

    joinBooking = () => {
        const selectPayment = this.state.selectPayment;
        const selectPoint = this.state.selectPoint;
        const booking = this.state.bookingID;
        let currPassengers = Passengers.trim();
        let bookingDate = bookingDate;
        // checks for duplicate booking
        let dates = [];
        let check = false;

        const join = fire.database().ref('bookings').orderByChild('date').startAt(Date.now());
        join.once('value', (snapshot) => {
            if (snapshot.exists()) {
                snapshot.forEach((data) => {
                    if (data.val().currPassengers.includes(this.state.username)) {
                        dates.push(data.val().date);
                    }
                });
            }
        }).then(() => {
            var i = 0;

            if (dates.length === 0) {
                check = true;
            } else {
                while (i < dates.length) {
                    if (Date.parse(bookingDate) < moment.unix(dates[i] / 1000).add(2, 'hours') && Date.parse(bookingDate) > moment.unix(dates[i] / 1000).add(-2, 'hours')) {
                        alert("You have another booking set 2 hours before/after this time");
                        check = false;
                        break;
                    } else {
                        check = true;
                    }
                    i++;
                }
            }

            if (check) {
                if (user[8] < 5.00 && document.getElementById('ddPayBy').value === "wallet") {
                    alert("You do not have sufficient funds in your e-wallet");
                } else {

                    const database = fire.database().ref('bookings');
                    database.once('value', (snapshot) => {
                        if (snapshot.exists()) {
                            let PostalCode;
                            let payMethod;
                            snapshot.forEach((data) => {
                                
                                if (data.key === booking) {
                                    payMethod = data.val().payMethod;
                                    PostalCode = data.val().postal;
                                    
                                    if (payMethod === "") {
                                        payMethod = selectPayment;
                                    } else {
                                        payMethod += (", " + selectPayment);
                                    }

                                    if (currPassengers === "") {
                                        currPassengers = this.state.username;
                                    } else {
                                        currPassengers += (", " + this.state.username);
                                    }

                                    if (PostalCode === "") {
                                        PostalCode = selectPoint;
                                    } else {
                                        PostalCode += (", " + selectPoint);
                                    }
                                }
                            })
                            const accountsRef = fire.database().ref('bookings/' + booking);
                            const bookingDetails = {
                                currPassengers: currPassengers,
                                payMethod: payMethod,
                                postal: PostalCode
                            }
                            
                            accountsRef.update(bookingDetails);
                        }
                    })
                }
            }
        });

    this.props.navigation.navigate('View My Bookings');
    }

    render() {
        if (this.state.binded) {
            return (
                <ScrollView style={screenStyle}>
                    <View style={pageStyle.wrapper}>
                        <Text style={pageStyle.header}>Booking ID</Text>
                        <TextInput
                            style={pageStyle.textinput}
                            value={this.state.bookingID}
                            editable='false'
                        />

                        <Text style={pageStyle.header}>Driver Username</Text>
                        <TextInput
                            style={pageStyle.textinput}
                            value={this.state.driver}
                            editable='false'
                        />

                        <Text style={pageStyle.header}>Date & Time</Text>
                        <TextInput
                            style={pageStyle.textinput}
                            value={this.state.datetime}
                            editable='false'
                        />

                        <Text style={pageStyle.header}>Area</Text>
                        <TextInput
                            style={pageStyle.textinput}
                            value={this.state.area}
                            editable='false'
                        />

                        <Text style={pageStyle.header}>Going Towards</Text>
                        <TextInput
                            style={pageStyle.textinput}
                            value={this.state.going}
                            editable='false'
                        />

                        <Text style={pageStyle.header}>Slots Left</Text>
                        <TextInput
                            style={pageStyle.textinput}
                            value={this.state.slots}
                            editable='false'
                        />

                        <Text style={pageStyle.header}>Payment Method</Text>
                        <Picker onValueChange={(selectPayment) => this.setState({ selectPayment })}>
                            <Picker.Item label="Wallet" value="Wallet" />
                            <Picker.Item label="Cash" value="Cash" />
                        </Picker>

                        <Text style={pageStyle.header}>Meeting/Drop-Off Point</Text>
                        <GooglePlacesAutocomplete
                            id='postal'
                            placeholder='Search address'
                            onSelect={({ description }) => (
                                geocodeByAddress(description)
                                    .then(results => getLatLng(results[0]))
                                    .then(({
                                        lat,
                                        lng
                                    }) => this.setState({
                                        selectPoint: description + ":" + lat + ":" + lng
                                    }))
                                    .catch(error => console.error(error))
                            )}
                            required
                        />

                        <View style={pageStyle.equalspace}>
                            <SubmitButton title='Submit' onPress={() => { this.joinBooking() }} />
                            <SubmitButton title='Cancel' onPress={() => { this.props.navigation.navigate('Bookings') }} />
                        </View>
                    </View>
                </ScrollView>
            );
        } else {
            return null && console.log('There is a problem with binding user data');
        }
    }
}
export default GoogleApiWrapper({
    apiKey: "AIzaSyARHBw1DzEQDE0auV06gUQRI8iNUKmwHaY",
    libraries: ["places"]
})(JoinBookingScreen);
