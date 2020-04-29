import firebase from '../../../base';
import 'firebase/firestore';

// view applicant that applied to be driver
viewApplicant((e) => {
    var driverID = e.target.parentElement.parentElement.id;
    document.getElementById('div_ViewApplicant').style.display = "block";
    document.getElementById('div_ViewReportedUser').style.display = "none";
    document.getElementById('div_driverApplication').style.display = "none";
    document.getElementById('div_ReportedUsers').style.display = "none";

    const database = firebase.database().ref('driverDetails').orderByChild('dateApplied');
    database.once('value', (snapshot) => {
        if (snapshot.exists()) {
            snapshot.forEach((data) => {
                if (data.key === driverID) {
                    let driverUname = data.val().driverUname;
                    let dateApplied = data.val().dateApplied;
                    let license = data.val().license;
                    let issuedDate = data.val().issueDate;
                    console.log(driverUname, dateApplied);

                    document.getElementById('td_ViewApplicant_driverID').innerHTML = data.key;
                    document.getElementById('td_ViewApplicant_username').innerHTML = driverUname;
                    document.getElementById('td_ViewApplicant_dateApplied').innerHTML = dateApplied;
                    document.getElementById('td_ViewApplicant_license').innerHTML = license;
                    document.getElementById('td_ViewApplicant_issuedDate').innerHTML = issuedDate;
                }
            });
        }
    });

    firebase.storage()
        .ref("license/" + driverID)
        .child("front")
        .getDownloadURL()
        .then(frontURL => {
            this.setState({
                frontURL
            });
        });

    firebase.storage()
        .ref("license/" + driverID)
        .child("back")
        .getDownloadURL()
        .then(backURL => {
            this.setState({
                backURL
            });
        });
})

module.exports.viewApplicant = viewApplicant;