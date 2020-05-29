import 'firebase/firestore';
import firebase from '../../../base';
import * as moment from 'moment';
import money from '../../assets/images/money.png';

export const loadCashoutHistory = () => {
    document.getElementById('tb_AllCashout').innerHTML = '';
    const database = firebase.database().ref('cashcheckout').orderByChild('date');
    database.once('value', (snapshot) => {
        if (snapshot.exists()) {
            let content = '';
            snapshot.forEach((data) => {
                let user = data.val().requester;
                let userID = data.val().requesterID;
                let date = moment.unix(data.val().date / 1000).format("DD MMM YYYY hh:mm a");
                let amount = data.val().amount;
                let disbursed = data.val().disbursed;

                content += '<div class=admin-box id=' + data.key + '>';
                content += '<img src=' + money + ' class=admin-icon />';
                content += '<div><p class=admin-label>' + userID + ' : ' + user + '</p>';
                content += '<p class=admin-amount>$ ' + amount + '</p>';
                content += '<p class=admin-footer>' + date + '</p>';
                content += '<p class=admin-footer>Disbursed : ' + disbursed + '</p>';
                content += '</div></div>';

                /*
                content += '<tr id=\'' + data.key + '\'>';
                content += '<td>' + userID + '</td>'; //column1
                content += '<td>' + user + '</td>'; //column2
                content += '<td>' + amount + '</td>';
                content += '<td>' + date + '</td>';
                content += '<td>' + disbursed + '</td>';
                content += '</tr>';
                */
            });
            document.getElementById('tb_AllCashout').innerHTML += content;
        }
    });
}