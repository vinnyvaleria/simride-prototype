import { db } from '../../config';
import 'firebase/firestore';

// view the reported user
viewReportedUser((e) => {
    var userID = e.target.parentElement.parentElement.id;
    document.getElementById('div_ViewApplicant').style.display = "none";
    document.getElementById('div_ViewReportedUser').style.display = "block";
    document.getElementById('div_driverApplication').style.display = "none";
    document.getElementById('div_ReportedUsers').style.display = "none";

    const database = db.ref('reportedUsers').orderByChild('lastReportDate');
    database.once('value', (snapshot) => {
        if (snapshot.exists()) {
            snapshot.forEach((data) => {
                if (data.key === userID) {
                    let username = data.val().username;
                    let lastReportDate = new Date(data.val().lastReportDate * -1);
                    let status = data.val().status;
                    let fake = data.val().fake;
                    let safety = data.val().safety;
                    let inappropriate = data.val().inappropriate;
                    let vulgar = data.val().vulgar;
                    console.log(username, lastReportDate);

                    document.getElementById('td_ViewReportedUser_userID').innerHTML = data.key;
                    document.getElementById('td_ViewReportedUser_username').innerHTML = username;
                    document.getElementById('td_ViewReportedUser_status').innerHTML = status;
                    document.getElementById('td_ViewReportedUser_lastreport').innerHTML = lastReportDate.toDateString();
                    document.getElementById('td_ViewReportedUser_fakeprofile').innerHTML = fake;
                    document.getElementById('td_ViewReportedUser_safety').innerHTML = safety;
                    document.getElementById('td_ViewReportedUser_inappropriate').innerHTML = inappropriate;
                    document.getElementById('td_ViewReportedUser_vulgar').innerHTML = vulgar;

                    if (status === "banned") {
                        document.getElementById('btnUnBanUser').style.display = "inline-block";
                        document.getElementById('btnBanUser').style.display = "none"
                    } else {
                        document.getElementById('btnUnBanUser').style.display = "none";
                        document.getElementById('btnBanUser').style.display = "inline-block"
                    }
                }
            });
        }
    });
})

module.export.viewReportedUser = viewReportedUser;