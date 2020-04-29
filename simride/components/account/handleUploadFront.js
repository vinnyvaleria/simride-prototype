import 'firebase/firestore';
import "firebase/storage";
import firebase from '../../../base';

// uplaods front license pic
    handleFrontUpload(() => {
      const {image} = this.state;
      if (image !== null) {
        const uploadTask = firebase.storage().ref().child(`license/${user[9]}/front`).put(image);
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
            alert('Error: ' + error);
            console.log(error);
          }, () => {
            // complete function ...
            alert('Image is uploaded!');
            document.getElementById('btnImgFrontUpload').style.display = 'none';
            document.getElementById('btnImgBackUpload').style.display = 'inline-block';
            document.getElementById('td_license').innerHTML = 'License Back:';
            document.getElementById('file').value = "";
            firebase.storage()
              .ref("license/" + user[9])
              .child("front")
              .getDownloadURL()
              .then(frontURL => {
                this.setState({
                  frontURL
              });
            });
          });
      } else {
        alert('Error: No file selected');
      }
    })
    module.exports.handleFrontUpload = handleFrontUpload;