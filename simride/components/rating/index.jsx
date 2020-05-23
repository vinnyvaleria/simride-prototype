import firebase from '../../../base';
import React, { Component } from 'react';
import { View } from 'react-native';
import StarRating from 'react-native-star-rating';
import {submitRating} from './submitRating';
import { user } from '../booking/checkEmail';
import { viewAllBookings } from '../booking/viewAllBookings';

let usersAll = '';
class rating extends Component {
    constructor(props) {
        super(props);
        this.state = {
            starCount: 0,
            ratedUsers: ''
        };
    }

    onStarRatingPress(rating) {
        this.setState({
            starCount: rating
        });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.bookingID !== this.props.bookingID) {
            this.bindDropDown(this.props.bookingID);
        }
    }

    addRated = (user) => {
        usersAll += user + ',';
        if (document.getElementById("ddUsers").options.length === 1) {
            alert('You have rated all the users!');
            this.setState({ starCount: 0 })
            viewAllBookings();
        }
        else {
            this.setState({ ratedUsers: usersAll }, (() => {
                this.bindDropDown(this.props.bookingID);
                this.setState({ starCount: 0 })
            }));
        }
    }

    bindDropDown(bookingID) {
        document.getElementById('ddUsers').innerHTML = '';
        const database = firebase.database().ref().child('bookings');
        database.once('value', (snapshot) => {
            if (snapshot.exists()) {
                let content = '';
                snapshot.forEach((child) => {
                    if (child.key === bookingID) {
                        let users = []
                        users = child.val().currPassengers.split(', ');
                        let driverID = child.val().driverID;
                        for (let i = 0; i < users.length; i++) {
                            if (users[i] !== user[2] && !this.state.ratedUsers.includes(users[i])) {
                                content += "<option value=\"";
                                content += users[i];
                                content += "\">" + users[i];
                                content += "</option>";
                            }
                        }
                        
                        if (driverID !== user[9]) {
                            const account = firebase.database().ref().child('accounts/' + driverID);
                            account.once('value', snapshot => {
                                if (snapshot.exists()) {
                                    let uname = snapshot.val().uname;

                                    content += "<option value=\"";
                                    content += uname;
                                    content += "\">" + uname + ' (Driver)';
                                    content += "</option>";
                                }
                                document.getElementById('ddUsers').innerHTML += content;
                            });
                        }
                    }
                });
            }
        });
    }

    render() {
        return (
            <View>
                <div>          
                    <table>
                        <tr>
                            <td>Rating for</td>
                            <td><select id="ddUsers" name='username' style={{ width: '5em' }} required></select></td>
                        </tr>
                        <tr><br/></tr>
                        <tr>
                            <td colSpan='2'>
                                <StarRating
                                    disabled={false}
                                    maxStars={5}
                                    fullStarColor={'yellow'}
                                    rating={this.state.starCount}
                                    selectedStar={(rating) => this.onStarRatingPress(rating)}
                                />
                            </td>
                        </tr>                  
                        <tr>
                            <td colSpan='2'>
                                <button id='btnSubmitRating' onClick={() => { submitRating(ddUsers.value, this.state.starCount, this.props.bookingID, user[2]); this.addRated(ddUsers.value);}}>Submit</button>
                            </td>
                        </tr>
                    </table>
                </div>
            </View>
        );
    }
}

export default rating;