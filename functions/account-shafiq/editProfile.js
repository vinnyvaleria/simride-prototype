import util from './util';

// edit profile
editProfile(() => {
    this.setState({
        firstName: user[0],
        lastName: user[1],
        phone: user[4]
    });
    util.editProfile();

    document.getElementById('tblApplyDriver').style.display = 'none';
    document.getElementById('btnApplyDriver').style.display = 'none';
    document.getElementById('cancelApplyDriverButton').style.display = 'none';
    document.getElementById('btnImgFrontUpload').style.display = 'none';
    document.getElementById('btnImgBackUpload').style.display = 'none';
    document.getElementById('submitDriverDetails').style.display = 'none';
})

module.exports.editProfile = editProfile;