import firebase from '../../../base';
import 'firebase/firestore';
import index from './index';
import bear from '../../assets/images/bear.png';

// view list of applicants
export const viewApplication = () => {
    document.getElementById('tb_driverApplication').innerHTML = '';

    const database = firebase.database().ref('driverDetails').orderByChild('dateApplied');
    database.once('value', (snapshot) => {
        if (snapshot.exists()) {
            let content = '';
            let rowCount = 0;
            snapshot.forEach((data) => {
                if (data.val().status === "pending" && data.val().completed === "yes") {
                    let driverUname = data.val().driverUname;
                    let dateApplied = data.val().dateApplied;
                    
                    content += '<div class=admin-box id=' + data.key + '>';
                    content += '<img src=' + bear + ' class=admin-icon />';
                    content += '<div><p class=admin-label>' + dateApplied + '</p>';
                    content += '<p class=admin-amount>' + driverUname + '</p>';
                    content += '<div id=\'btnViewApplicant' + rowCount + '\'></div>';
                    content += '</div></div>';

                    /*
                    content += '<tr id=\'' + data.key + '\'>';
                    content += '<td>' + driverUname + '</td>'; //column1
                    content += '<td>' + dateApplied + '</td>'; //column2
                    content += '<td id=\'btnViewApplicant' + rowCount + '\'></td>';
                    content += '</tr>';
                    */

                    rowCount++;
                }
            });

            document.getElementById('tb_driverApplication').innerHTML += content;

            for (let v = 0; v < rowCount; v++) {
                let btn = document.createElement('input');
                btn.setAttribute('type', 'button')
                btn.setAttribute('value', 'View');
                btn.onclick = new index().viewApplicant;
                document.getElementById('btnViewApplicant' + v).appendChild(btn);
            }
        }
    });
}