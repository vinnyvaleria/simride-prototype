const util = require('./util')
import {checkDriverApplicationStatus} from './checkDriverApplicationStatus';
import { user } from './checkEmail';

export const cancelEditProfile = () => {
    util.profilePageReset();
    if (user[5] === 'no') {
        checkDriverApplicationStatus();
    }

    document.getElementById('tblApplyDriver').style.display = 'none';
    document.getElementById('cancelApplyDriverButton').style.display = 'none';
    document.getElementById('btnImgFrontUpload').style.display = 'none';
    document.getElementById('btnImgBackUpload').style.display = 'none';
    document.getElementById('submitDriverDetails').style.display = 'none';
    document.getElementById('btnLogout').style.display = 'inline-block';

    document.getElementById('editfName').value = "";
    document.getElementById('editlName').value = "";
    document.getElementById('editPhone').value = "";
}