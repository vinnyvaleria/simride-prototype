import firebase from '../../base';
import 'firebase/firestore';

// approve applicants
approveApplicant(() => {
    const driverID = document.getElementById('td_ViewApplicant_driverID').innerHTML;
    const accountsRef = firebase.database().ref('accounts/' + driverID);
    accountsRef.orderByChild('email')
        .once('value')
        .then((snapshot) => {
            snapshot.ref.update({
                isDriver: "yes"
            })
        });

    const driverRef = firebase.database().ref('driverDetails/' + driverID);
    driverRef.orderByChild('dateApplied')
        .once('value')
        .then((snapshot) => {
            snapshot.ref.update({
                status: "approved"
            })
        });

    this.viewApplication();

    document.getElementById('div_ViewApplicant').style.display = "none";
    document.getElementById('div_driverApplication').style.display = "block";
})

module.export.approveApplicant = approveApplicant;