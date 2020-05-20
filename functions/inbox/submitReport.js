import firebase from '../../base';
import 'firebase/firestore';

submitReport(() => {
    const date = new Date();
    let m = date.getMonth() + 1;
    let d = date.getDate();
    let y = date.getFullYear();
    const today = new Date(y, m, d);

    if (document.getElementById('ddReportReason').value === "fake") {
        const reportRef = firebase.database().ref('reportedUsers/' + clickedUserID);
        reportRef.once('value', (snapshot) => {
            if (snapshot.exists()) {
                reportRef.set({
                    status: "not banned",
                    lastReportDate: today * -1,
                    username: clickedUser,
                    fake: snapshot.val().fake += 1,
                    safety: snapshot.val().safety += 0,
                    vulgar: snapshot.val().vulgar += 0,
                    inappropriate: snapshot.val().inappropriate += 0,
                    noshow: snapshot.val().inappropriate += 0
                });
            } else {
                const reportRef = firebase.database().ref('reportedUsers/' + clickedUserID);
                reportRef.set({
                    username: clickedUser,
                    status: "not banned",
                    lastReportDate: today * -1,
                    fake: 1,
                    safety: 0,
                    vulgar: 0,
                    inappropriate: 0,
                    noshow: 0
                });
            }
        });
    } else if (document.getElementById('ddReportReason').value === "safety") {
        const reportRef = firebase.database().ref('reportedUsers/' + clickedUserID);
        reportRef.once('value', (snapshot) => {
            if (snapshot.exists()) {
                reportRef.set({
                    status: "not banned",
                    lastReportDate: today * -1,
                    username: clickedUser,
                    fake: snapshot.val().fake += 0,
                    safety: snapshot.val().safety += 1,
                    vulgar: snapshot.val().vulgar += 0,
                    inappropriate: snapshot.val().inappropriate += 0,
                    noshow: snapshot.val().inappropriate += 0
                });
            } else {
                const reportRef = firebase.database().ref('reportedUsers/' + clickedUserID);
                reportRef.set({
                    username: clickedUser,
                    status: "not banned",
                    lastReportDate: today * -1,
                    fake: 0,
                    safety: 1,
                    vulgar: 0,
                    inappropriate: 0,
                    noshow: 0
                });
            }
        });
    } else if (document.getElementById('ddReportReason').value === "vulgar") {
        const reportRef = firebase.database().ref('reportedUsers/' + clickedUserID);
        reportRef.once('value', (snapshot) => {
            if (snapshot.exists()) {
                reportRef.set({
                    status: "not banned",
                    lastReportDate: today * -1,
                    username: clickedUser,
                    fake: snapshot.val().fake += 0,
                    safety: snapshot.val().safety += 0,
                    vulgar: snapshot.val().vulgar += 1,
                    inappropriate: snapshot.val().inappropriate += 0,
                    noshow: snapshot.val().inappropriate += 0
                });
            } else {
                reportRef.set({
                    username: clickedUser,
                    status: "not banned",
                    lastReportDate: today * -1,
                    fake: 0,
                    safety: 0,
                    vulgar: 1,
                    inappropriate: 0,
                    noshow: 0
                });
            }
        });
    } else if (document.getElementById('ddReportReason').value === "inappropriate") {
        const reportRef = firebase.database().ref('reportedUsers/' + clickedUserID);
        reportRef.once('value', (snapshot) => {
            if (snapshot.exists()) {
                reportRef.set({
                    status: "not banned",
                    lastReportDate: today * -1,
                    username: clickedUser,
                    fake: snapshot.val().fake += 0,
                    safety: snapshot.val().safety += 0,
                    vulgar: snapshot.val().vulgar += 0,
                    inappropriate: snapshot.val().inappropriate += 1,
                    noshow: snapshot.val().inappropriate += 0
                });
            } else {
                reportRef.set({
                    username: clickedUser,
                    status: "not banned",
                    lastReportDate: today * -1,
                    fake: 0,
                    safety: 0,
                    vulgar: 0,
                    inappropriate: 1,
                    noshow: 0
                });
            }
        });
    } else if (document.getElementById('ddReportReason').value === "noshow") {
        const reportRef = firebase.database().ref('reportedUsers/' + clickedUserID);
        reportRef.once('value', (snapshot) => {
            if (snapshot.exists()) {
                reportRef.set({
                    status: "not banned",
                    lastReportDate: today * -1,
                    username: clickedUser,
                    fake: snapshot.val().fake += 0,
                    safety: snapshot.val().safety += 0,
                    vulgar: snapshot.val().vulgar += 0,
                    inappropriate: snapshot.val().inappropriate += 0,
                    noshow: snapshot.val().inappropriate += 1
                });
            } else {
                reportRef.set({
                    username: clickedUser,
                    status: "not banned",
                    lastReportDate: today * -1,
                    fake: 0,
                    safety: 0,
                    vulgar: 0,
                    inappropriate: 0,
                    noshow: 1
                });
            }
        });
    }

    alert("Report has been sent");
    document.getElementById('otherAcctPage').style.display = "none";
    document.getElementById('msgsPage').style.display = "block";
})

module.exports.submitReport = submitReport;