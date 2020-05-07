/* eslint-disable promise/catch-or-return */
/* eslint-disable no-alert */
import firebase from '../../../base';
import React from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import Geocode from "react-geocode";
import getDirections from 'react-native-google-maps-directions'

Geocode.enableDebug();

let postal = []
let ppl = []
let towards

class map extends React.Component {
    constructor() {
        super();
        this.state = {
            ready: false,
            to: { lat: null, lng: null },
            from: { lat: null, lng: null },
            error: null
        }
    }

    componentDidMount() {
        const self = this;

        if ("geolocation" in navigator) {
            console.log("Available");

            navigator.geolocation.watchPosition(function (position) {
                let d = self.distance(position.coords.longitude, position.coords.latitude, self.state.to.lng, self.state.to.lat);
                console.log("Distance from destination is:", d + 'km', position.coords.longitude, position.coords.latitude, self.state.to.lng, self.state.to.lat);
            });

            self.getPostal(document.getElementById('bookingID').value);

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

    distance = (lon1, lat1, lon2, lat2) => {
        var earthRadiusKm = 6371;

        var dLat = this.degreesToRadians(lat2 - lat1);
        var dLon = this.degreesToRadians(lon2 - lon1);

        lat1 = this.degreesToRadians(lat1);
        lat2 = this.degreesToRadians(lat2);

        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return earthRadiusKm * c;
    }

    degreesToRadians = (degrees) => {
        return degrees * Math.PI / 180;
    }

    geoSuccess = (position) => {
        console.log(position);
        console.log(position.coords.latitude);
        console.log(position.coords.longitude);
        this.setState({
            ready: true,
            from: { lat: position.coords.latitude, lng: position.coords.longitude }
        })
    }

    geoFailure = (err) => {
        this.setState({ error: err.message });
    }

    getPostal = (id) => {
        const database = firebase.database().ref('bookings');
        database.once('value', (snapshot) => {
            if (snapshot.exists()) {
                snapshot.forEach((data) => {
                    if (data.key === id) { // replace with bookingID later
                        towards = data.val().towards;

                        if (data.val().currPassengers !== "") {
                            ppl = data.val().currPassengers.split(', ');
                            postal = data.val().postal.split(', ');
                        }
                    }
                });

                for (var d = 0; d < ppl.length; d++) {
                    var btn = document.createElement('input');
                    btn.setAttribute('type', 'button')
                    btn.setAttribute('value', ppl[d]);
                    btn.setAttribute('id', postal[d]);
                    btn.onclick = this.plotPts;
                    if (document.getElementById('directions') !== null) {
                        document.getElementById('directions').appendChild(btn);
                    }
                    
                    console.log(btn)
                }
            }
        });
    }

    plotPts = (e) => {
        postal = e.target.id;
        let latlng = postal.split(':');
        if (towards === 'Home') {
            this.setState({
                to: {
                    lat: parseFloat(latlng[1]),
                    lng: parseFloat(latlng[2])
                },
                from: {
                    lat: 1.329426,
                    lng: 103.776571
                },
            })
        }
        else {
            this.setState({
                from: {
                    lat: parseFloat(latlng[1]),
                    lng: parseFloat(latlng[2])
                },
                to: {
                    lat: 1.329426,
                    lng: 103.776571
                },
            })
        }
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

    render() {
        return (
            <View style={style.container}>
                <div id='bookingID'>{this.props.bookingID}</div>
                {!this.state.ready && (
                    <Text>Please allow location access.</Text>
                )}
                {this.state.error && (
                    <Text>{this.state.error}</Text>
                )}
                {this.state.ready && (
                    <Text>Latitude:{this.state.to.lat}, Longitude:{this.state.to.lng}
                        <div id='directions'></div>
                        <div>
                            <Button onPress={this.handleGetDirections} title="Get Directions" />

                            <Map google={this.props.google} zoom={16} initialCenter={{ lat: this.state.from.lat, lng: this.state.from.lng }}>
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