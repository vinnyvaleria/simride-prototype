import 'firebase/firestore';
import "firebase/storage";
import firebase from '../../../base';
import { user } from './checkEmail';

// submits driver details into realtime db
export const submitDriverDetails = (license, carplate) => {
    var date = new Date;
    var m = date.getMonth();
    var d = date.getDate();
    var y = date.getFullYear() - 2;
    var yy = date.getFullYear();
    var issuedDate = new Date(document.getElementById('txtIssueDate').value);
    var today = new Date(y, m, d);
    var now = new Date(yy, m, d)
    const rg = new RegExp('^((S|T)[0-9]{7}[A-Z]{1}$)');

    if (license !== "" && carplate !== "" && rg.test(license.toUpperCase()) && today > issuedDate) {
        const accountsRef = firebase.database().ref('driverDetails/' + user[9]);
        const driverDetails = {
            driverUname: user[2],
            carplate: carplate,
            license: license,
            issueDate: document.getElementById('txtIssueDate').value,
            completed: "no",
            status: "pending",
            dateApplied: now.toDateString()
        }

        accountsRef.update(driverDetails);
        
        document.getElementById('tblDriverDetails').style.display = 'none';
        document.getElementById('tblDriverImage').style.display = 'block';
        document.getElementById('btnImgFrontUpload').style.display = 'inline-block';
        document.getElementById('btnImgBackUpload').style.display = 'none';
        document.getElementById('submitDriverDetails').style.display = 'none';
    } else {
        if (license === "" || carplate === "") {
            alert('One or more fields are empty');
        } else if (!rg.test(license.toUpperCase())) {
            alert('Please enter a valid license number');
        } else if (issuedDate > today) {
            alert('You must be a driver for at least 2 years');
        }
    }
}