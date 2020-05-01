import 'firebase/firestore';
import "firebase/storage";
import firebase from '../../../base';
import { bindUser as user } from '../../functions/bindUserData';

// submits driver details into realtime db
export const submitDriverDetails = () => {
    var date = new Date;
    var m = date.getMonth() + 1;
    var d = date.getDate();
    var y = date.getFullYear() - 2;
    var yy = date.getFullYear();
    var issuedDate = new Date(document.getElementById('txtIssueDate').value);
    var today = new Date(y, m, d);
    var now = new Date(yy, m, d)

    if (this.state.license !== "" && this.state.carplate !== "" && this.state.license.length === 9 && (this.state.license.charAt(0) === 'S' || this.state.license.charAt(0) === 'T') && today > issuedDate) {
        const accountsRef = firebase.database().ref('driverDetails/' + user[9]);
        const driverDetails = {
            driverUname: user[2],
            carplate: this.state.carplate,
            license: this.state.license,
            issueDate: document.getElementById('txtIssueDate').value,
            completed: "no",
            status: "pending",
            dateApplied: now
        }

        accountsRef.update(driverDetails);
        this.state = {
            carplate: '',
            license: '',
            status: '',
            dateApplied: ''
        };

        document.getElementById('tblDriverDetails').style.display = 'none';
        document.getElementById('tblDriverImage').style.display = 'block';
        document.getElementById('btnImgFrontUpload').style.display = 'inline-block';
        document.getElementById('btnImgBackUpload').style.display = 'none';
        document.getElementById('submitDriverDetails').style.display = 'none';
    } else {
        if (this.state.license === "" || this.state.carplate === "") {
            alert('One or more fields are empty');
        } else if (this.state.license.length !== 9 || (this.state.license.charAt(0) !== 'S' && this.state.license.charAt(0) !== 'T')) {
            alert('Please enter a valid license number');
        } else if (issuedDate > today) {
            alert('You must be a driver for at least 2 years');
        }
    }
}