import { message } from 'antd';
import { storage } from 'firebase';
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from 'firebase/storage';

export const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

export const uuidv4 = () =>
  'xxxxxxxxxxxxxxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });

export const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

export const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }

  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }

  return isJpgOrPng && isLt2M;
};

export const fakeUpload = async (options) => {
  const { onSuccess } = options;
  onSuccess('Ok');
};

export const uploadFileToFirebase = async (file) => {
  const storageRef = ref(storage, 'images/' + `${Date.now() + file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on(
    'state_changed',
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      // const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      // console.log('Upload is ' + progress + '% done');
      // switch (snapshot.state) {
      // 	case 'paused':
      // 		console.log('Upload is paused');
      // 		break;
      // 	case 'running':
      // 		console.log('Upload is running');
      // 		break;
      // }
    },
    (error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          break;
        case 'storage/canceled':
          // User canceled the upload
          break;

        // ...

        case 'storage/unknown':
          // Unknown error occurred, inspect error.serverResponse
          break;
      }
    }
  );
  await uploadTask;
  const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
  // 👆 getDownloadURL returns a promise too, so... yay more await

  return downloadURL; // 👈 return the URL to the caller
};

export const uploadMultipleFileToFirebase = async (fileList) => {
  const data = []
  const promises = [];

  for (const item of fileList) {
    const storageRef = ref(storage, 'images/' + `${Date.now() + item.name}`);
    promises.push(uploadBytes(storageRef, item?.originFileObj))
  }

  const uploadResults = await Promise.all(promises);
  const downloadURLs = [];
  for (const item of uploadResults) {
    data.push({ fullPath: item.metadata.fullPath, downloadURL: '', name: '' })
    downloadURLs.push(getDownloadURL(item.ref))
  }
  const downloadURLsResult = await Promise.all(downloadURLs);
  for (let i = 0; i < downloadURLsResult.length; i++) {
    data[i].downloadURL = downloadURLsResult[i]
    data[i].name = fileList[i].name
  }

  console.log('data', data)
  return data;

};
// for (let i = 0; i < fileList.length; i++) {
//   const storageRef = ref(storage, 'images/' + `${Date.now() + fileList[i].name}`);
//   const uploadTask = uploadBytesResumable(storageRef, fileList[i]?.originFileObj);
//   uploadTask.on(
//     'state_changed',
//     (snapshot) => {
//       // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
//       // const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//       // console.log('Upload is ' + progress + '% done');
//       // switch (snapshot.state) {
//       // 	case 'paused':
//       // 		console.log('Upload is paused');
//       // 		break;
//       // 	case 'running':
//       // 		console.log('Upload is running');
//       // 		break;
//       // }
//     },
//     (error) => {
//       // A full list of error codes is available at
//       // https://firebase.google.com/docs/storage/web/handle-errors
//       switch (error.code) {
//         case 'storage/unauthorized':
//           // User doesn't have permission to access the object
//           break;
//         case 'storage/canceled':
//           // User canceled the upload
//           break;

//         // ...

//         case 'storage/unknown':
//           // Unknown error occurred, inspect error.serverResponse
//           break;
//       }
//     },
//     () => {
//       getDownloadURL(uploadTask.snapshot.ref).then(url => { console.log('url', url); urls.push(url) });
//     }
//   );
// }



// // await uploadTask;
// // const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
// // // 👆 getDownloadURL returns a promise too, so... yay more await

// return urls; // 👈 return the URL to the caller
// };

const uploadFileAndGetDownloadURL = async (ref, file) => {
  try {
    const snap = await uploadBytes(ref, file);
    const downloadURL = await getDownloadURL(snap.ref);
    return downloadURL;
  } catch (error) {
    message.error("Tải ảnh lỗi vùi lòng tải lại trang!")
  }
};

export const sendImageToFirebase = async (fileList) => {
  const promises = [];
  fileList.forEach((image, i) => {
    const storageRef = ref(storage, 'images/' + `${Date.now() + image.name}`);
    promises.push(uploadFileAndGetDownloadURL(storageRef, image));
  });

  //Your array with the urls
  const urlsArray = await Promise.all(promises);
  debugger
  return urlsArray;
};