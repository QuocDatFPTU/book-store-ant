import { Upload } from 'antd';
import React, { useState } from 'react';

const UploadImages = () => {
  const [defaultFileList, setDefaultFileList] = useState([]);
  const [fileList, setFileList] = useState([]);

  const handleChange = ({ fileList }) => {
    console.log(fileList);
    return setFileList(fileList.filter((file) => file.status !== 'error'));
  };
  const onRemove = async (file) => {
    const index = fileList.indexOf(file);
    const newFileList = fileList.slice();
    newFileList.splice(index, 1);

    setFileList(newFileList);
  };
  const beforeUpload = (file) => {
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
  const fakeUpload = async (options) => {
    console.log(options);
    const { onSuccess } = options;
    onSuccess('Ok');
  };

  return (
    <Upload
      accept="image/*"
      maxCount={2}
      listType="picture-card"
      showUploadList={true}
      fileList={fileList}
      //Change
      onChange={handleChange}
      //Before
      beforeUpload={(file) => {
        console.log(file);
        beforeUpload(file);
      }}
      //Custom
      customRequest={fakeUpload}
      //remove
      onRemove={onRemove}
    >
      Upload
    </Upload>
  );
};

export default UploadImages;
