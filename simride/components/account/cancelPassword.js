const util = require('./util')
import {checkDriverApplicationStatus} from './checkDriverApplicationStatus';
import { user } from './checkEmail';

export const cancelPassword = () => {
    util.profilePageReset();

    if (user[6] !== "") {
        document.getElementById('btnApplyDriver').style.display = "none";
    } else {
        if (user[5] === "no") {
            checkDriverApplicationStatus();
        }
    }

    document.getElementById('tblApplyDriver').style.display = 'none';
    document.getElementById('cancelApplyDriverButton').style.display = 'none';
    document.getElementById('btnImgFrontUpload').style.display = 'none';
    document.getElementById('btnImgBackUpload').style.display = 'none';
    document.getElementById('submitDriverDetails').style.display = 'none';
    document.getElementById('btnLogout').style.display = 'inline-block';
}