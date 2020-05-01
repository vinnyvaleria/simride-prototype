const util = require('./util')
import {checkDriverApplicationStatus} from './checkDriverApplicationStatus';
import { bindUser as user } from '../../functions/bindUserData';

export const cancelEditProfile = () => {
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

    document.getElementById('editfName').value = "";
    document.getElementById('editlName').value = "";
    document.getElementById('editPhone').value = "";
}