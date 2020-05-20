import { db } from '../../config';
import 'firebase/firestore';

unBanUser(() => {
    const userID = document.getElementById('td_ViewReportedUser_userID').innerHTML;
    const accountsRef = db.ref('accounts/' + userID);
    accountsRef.once('value')
        .then((snapshot) => {
            snapshot.ref.update({
                isBanned: "no"
            })
        });

    const reportedRef = db.ref('reportedUsers/' + userID);
    reportedRef.once('value')
        .then((snapshot) => {
            snapshot.ref.update({
                status: "not banned"
            })
        });

    alert("User has been unbanned");

    document.getElementById('div_ViewApplicant').style.display = "none";
    document.getElementById('div_ViewReportedUser').style.display = "none";
    document.getElementById('div_driverApplication').style.display = "block";
    document.getElementById('div_ReportedUsers').style.display = "block";
})

module.export.unBanUser = unBanUser;