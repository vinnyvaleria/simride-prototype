import firebase from '../../../base';
import 'firebase/firestore';

// view list of applicants
viewApplication(() => {
    const self = this;
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
                    console.log(driverUname, dateApplied);
                    content += '<tr id=\'' + data.key + '\'>';
                    content += '<td>' + driverUname + '</td>'; //column1
                    content += '<td>' + dateApplied + '</td>'; //column2
                    content += '<td id=\'btnViewApplicant' + rowCount + '\'></td>';
                    content += '</tr>';

                    rowCount++;
                    console.log(rowCount, content);
                }
            });

            document.getElementById('tb_driverApplication').innerHTML += content;

            for (let v = 0; v < rowCount; v++) {
                let btn = document.createElement('input');
                btn.setAttribute('type', 'button')
                btn.setAttribute('value', 'View');
                btn.onclick = self.viewApplicant;
                document.getElementById('btnViewApplicant' + v).appendChild(btn);
            }
        }
    });
})

module.export.viewApplication = viewApplication;