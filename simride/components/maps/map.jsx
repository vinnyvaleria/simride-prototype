/* eslint-disable promise/catch-or-return */
/* eslint-disable no-alert */
import firebase from '../../../base';
import React from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import Geocode from "react-geocode";
import getDirections from 'react-native-google-maps-directions'
import { distance } from './distanceCalc';
import { notifyHere } from './notifyHere';
import { userBoard } from './userBoard';
import { userNoShow } from './userNoShow';
import { updateBooking } from './updateBooking';

Geocode.enableDebug();

let postal = []
let ppl = []
let payMethod = []
let towards

class map extends React.Component {
    constructor() {
        super();
        this.state = {
            ready: false,
            to: { lat: null, lng: null },
            from: { lat: null, lng: null },
            error: null,
            user: null,
            payMethod: null,
            action: 'meet',
            curr: {lat: null, lng: null}
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.bookingID !== this.props.bookingID) {
            this.getPostal();
        }
    }

    componentDidMount() {
        const self = this;
        if ("geolocation" in navigator) {
            console.log("Available");
            if (this.state.action === 'meet') {
                navigator.geolocation.watchPosition(function (position) {
                    let d = distance(position.coords.longitude, position.coords.latitude, self.state.to.lng, self.state.to.lat);

                    self.setState({
                        curr: {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        }
                    })

                    if (document.getElementById('btnHere') !== null) {
                        if (d < 0.05) {
                            document.getElementById('btnHere').style.display = 'block';
                        }
                        else {
                            document.getElementById('btnHere').style.display = 'none';
                        }
                    }
                    console.log("Distance from destination is:", d + 'km', position.coords.longitude, position.coords.latitude, self.state.from.lng, self.state.from.lat);
                });
            }
            else if (this.state.action === 'drive') {
                navigator.geolocation.watchPosition(function (position) {
                    let d = distance(position.coords.longitude, position.coords.latitude, self.state.to.lng, self.state.to.lat);

                    console.log("Distance from destination is:", d + 'km', position.coords.longitude, position.coords.latitude, self.state.to.lng, self.state.to.lat);
                });
            }

            let geoOptions = {
                enableHighAccuracy: true,
                timeOut: 20000,
                maximumAge: 10000
            };
            self.setState({ ready: false });
            navigator.geolocation.getCurrentPosition(self.geoSuccess, self.geoFailure, geoOptions);

        } else {
            alert("Please switch on your GPS");
        }
    }

    geoSuccess = (position) => {
        console.log(position);
        this.setState({
            ready: true,
            from: { lat: position.coords.latitude, lng: position.coords.longitude }
        })
    }

    geoFailure = (err) => {
        this.setState({ error: err.message });
    }

    getPostal = () => {
        const database = firebase.database().ref('bookings');
        database.once('value', (snapshot) => {
            if (snapshot.exists()) {
                let content = '';
                snapshot.forEach((data) => {
                    if (data.key === this.props.bookingID) { // replace with bookingID later
                        towards = data.val().towards;

                        if (towards === 'School') {
                            if (document.getElementById('school') !== null) {
                                document.getElementById('school').style.display = 'none';
                                document.getElementById('directions').style.display = 'block';
                            }
                        }
                        else {
                            if (document.getElementById('directions') !== null) {
                                document.getElementById('school').style.display = 'block';
                                document.getElementById('directions').style.display = 'none';
                            }
                        }

                        if (data.val().currPassengers !== "") {
                            ppl = data.val().currPassengers.split(', ');
                            postal = data.val().postal.split(', ');
                            payMethod = data.val().payMethod.split(', ');
                        }

                        for(let i=0; i<ppl.length; i++) {
                            content += '<tr id=\'' + i + '_' + data.key + '\'>';
                            content += '<td>' + ppl[i] + '</td>'; //column1
                            content += '<td>' + postal[i].split(':')[0] + '</td>';
                            content += '<td>' + payMethod[i] + '</td>'
                            content += '<td id=\'btnPlotPts' + i + '\'></td>';
                            content += '</tr>';
                        }
                    }
                });

                if (document.getElementById('directions') != null) {
                    document.getElementById('directions').innerHTML += content;
                }

                for (var d = 0; d < ppl.length; d++) {
                    var btn = document.createElement('input');
                    btn.setAttribute('type', 'button')
                    btn.setAttribute('value', 'Set Directions');
                    btn.setAttribute('id', postal[d] + ':' + ppl[d] + ':' + payMethod[d]);
                    btn.onclick = this.plotPts;
                    if (document.getElementById('btnPlotPts' + d) !== null) {
                        document.getElementById('btnPlotPts' + d).appendChild(btn);
                    }
                    
                    console.log(btn)
                }
            }
        });
    }

    plotPts = (e) => {
        postal = e.target.id;
        alert(this.state.curr.lat)
        let latlng = postal.split(':');
        this.setState({
            payMethod: latlng[4],
            user: latlng[3],
            to: {
                lat: parseFloat(latlng[1]),
                lng: parseFloat(latlng[2])
            },
            from: {
                lat: this.state.curr.lat,
                lng: this.state.curr.lng
            },
        })
    }

    //Testing1 This shows route, but it brings you to the actual google maps
    handleGetDirections = () => {
        const data = {
            source: {
                latitude: this.state.from.lat,
                longitude: this.state.from.lng
            },
            destination: {
                latitude: this.state.to.lat,
                longitude: this.state.to.lng
            },
            params: [
                {
                    key: "travelmode",
                    value: "driving"       // may be "walking", "bicycling" or "transit" as well
                },
                {
                    key: "dir_action",
                    value: "navigate"       // this instantly initializes navigation using the given travel mode
                }
            ]
        }
        getDirections(data)
    }

    pickedUpAll = () => {
        this.setState({
            action: 'drive'
        },
        function () {
            if (this.state.action === 'drive') {
                document.getElementById('div_meet').style.display = 'none';
                document.getElementById('div_drive').style.display = 'block';

                if (towards === 'School') {
                    document.getElementById('school').style.display = 'block';
                    document.getElementById('directions').style.display = 'none';
                }
                else {
                    document.getElementById('school').style.display = 'none';
                    document.getElementById('directions').style.display = 'block';
                }
            }
        })
    }

    render() {
        return (
            <View style={style.container}>
                {!this.state.ready && (
                    <Text>Please turn on your GPS and allow GPS location</Text>
                )}
                {this.state.error && (
                    <Text>{this.state.error}</Text>
                )}
                {this.state.ready && (
                    <Text>Latitude:{this.state.to.lat}, Longitude:{this.state.to.lng}
                        <div>
                            <table>
                                <tbody id='directions'></tbody>
                                <tbody id='school'>
                                    <tr>
                                        <td>School</td>
                                        <td>SIM Global Education</td>
                                        <td><input type="button" value="Set Directions" onClick={this.plotPts} id="SIM Global Education:1.329297:103.776518:School:cash" /></td>
                                    </tr>
                                </tbody>
                            </table>
                            <div id='div_meet'>
                                <button id='btnHere' onClick={() => notifyHere(this.state.user)} style={{ display: 'none' }}>I'm here</button>
                                <button id='btnBoard' onClick={() => userBoard(this.state.user, this.state.payMethod)} style={{ display: 'none' }}>Passenger has boarded</button>
                                <button id='btnNoShow' onClick={() => userNoShow(this.state.user)} style={{ display: 'none' }}>Passenger did not show up</button>
                                <button id='btnPickUpAll' onClick={this.pickedUpAll} style={{ display: 'block' }}>Picked up all passengers, let's go!</button>
                            </div>
                            <div id='div_drive' style={{ display: 'none' }}>
                                <button id='btnDriveDone' onClick={() => updateBooking(this.props.bookingID)}>Drive is done</button>
                            </div>
                        </div>
                        <div>
                            <Button onPress={this.handleGetDirections} title="Get Directions" />

                            <Map google={this.props.google} zoom={17} initialCenter={{ lat: this.state.from.lat, lng: this.state.from.lng }}>
                                <Marker onClick={this.onMarkerClick}
                                    name={'Current location'} />
                                <Marker
                                    name={'Destination'}
                                    position={{ lat: this.state.to.lat, lng: this.state.to.lat }} />
                            </Map>
                        </div>
                    </Text>
                )}
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        width: '600px',
        height: '500px'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    }
});

export default GoogleApiWrapper({
    apiKey: 'AIzaSyARHBw1DzEQDE0auV06gUQRI8iNUKmwHaY'
})(map);