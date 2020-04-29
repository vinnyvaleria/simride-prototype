import 'firebase/firestore';
import "firebase/storage";
import firebase from '../../../base';

// uploads back license pic
handleBackUpload(() => {
    var date = new Date;
    var m = date.getMonth() + 1;
    var d = date.getDate();
    var y = date.getFullYear();
    var today = new Date(y, m, d);

    const {
        image
    } = this.state;
    if (image !== null) {
        const uploadTask = firebase.storage().ref().child(`license/${user[9]}/back`).put(image);
        uploadTask.on(
            "state_changed",
            snapshot => {
                // progress function ...
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                this.setState({
                    progress
                });
                console.log('Upload is ' + progress + '% done');
            },
            error => {
                // Error function ...
                console.log(error);
            }, () => {
                // complete function ...
                alert('Image is uploaded!')
                firebase.storage()
                    .ref("license/" + user[9])
                    .child("back")
                    .getDownloadURL()
                    .then(backURL => {
                        this.setState({
                            backURL
                        });
                    });

                const driverDetails = {
                    completed: "yes",
                    dateApplied: today
                }

                accountsRef.update(driverDetails);
            });
    } else {
        alert('Error: No file selected');
    }
})
module.exports.handleBackUpload = handleBackUpload;