import firebase from '../../../base';
import 'firebase/firestore';
import { viewReportedUser } from './viewReportedUser';
import close from '../../assets/images/close.png';

// view reported users
export const viewReportedList = () => {
    document.getElementById('tb_ReportedUsers').innerHTML = '';

    const database = firebase.database().ref('reportedUsers').orderByChild('lastReportDate');
    database.once('value', (snapshot) => {
        if (snapshot.exists()) {
            let content = '';
            let rowCount = 0;
            snapshot.forEach((data) => {
                let username = data.val().username;
                let lastDate = new Date(data.val().lastReportDate * -1);
                let status = data.val().status;

                content += '<div class=admin-box id=' + data.key + '>';
                content += '<img src=' + close + ' class=admin-icon />';
                content += '<div><p class=admin-label>' + lastDate.toDateString() + ' : ' + status + '</p>';
                content += '<p class=admin-amount>' + username + '</p>';
                content += '<div id=\'btnViewReportedUser' + rowCount + '\'></div>';
                content += '</div></div>';

                /*
                content += '<tr id=\'' + data.key + '\'>';
                content += '<td>' + username + '</td>'; //column1
                content += '<td>' + lastDate.toDateString() + '</td>'; //column2
                content += '<td>' + status + '</td>';
                content += '<td id=\'btnViewReportedUser' + rowCount + '\'></td>';
                content += '</tr>';*/

                rowCount++;
            });

            document.getElementById('tb_ReportedUsers').innerHTML += content;

            for (let v = 0; v < rowCount; v++) {
                let btn = document.createElement('input');
                btn.setAttribute('type', 'button')
                btn.setAttribute('value', 'View');
                btn.onclick = viewReportedUser;
                document.getElementById('btnViewReportedUser' + v).appendChild(btn);
            }
        }
    });
}