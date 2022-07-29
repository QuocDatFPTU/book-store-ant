/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import {
  Col,
  Form,
  Modal,
  Upload,
  Row,
  Input,
  Button,
  message,
  Checkbox,
  Select,
  InputNumber,
  DatePicker,
} from 'antd';
import 'moment/locale/vi';
import { createSlider, updateSlider } from './slider.service';
import {
  beforeUpload,
  fakeUpload,
  getBase64,
  normFile,
  uploadFileToFirebase,
  uuidv4,
} from 'util/file';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from 'firebase';
import moment from 'moment';
const SliderEdit = ({
  currentRow,
  onCallback,
  isEditModal,
  setIsEditModal,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [defaultFileList, setDefaultFileList] = useState([]);
  const { TextArea } = Input;

  //Set up upload images
  const getDefaultFileList = (record) => {
    return [
      {
        uid: uuidv4(),
        name: 'image',
        url: record,
      },
    ];
  };

  const handleChange = ({ fileList }) =>
    setFileList(fileList.filter((file) => file.status !== 'error'));

  const onRemove = async (file) => {
    const index = fileList.indexOf(file);
    const newFileList = fileList.slice();
    newFileList.splice(index, 1);

    setFileList(newFileList);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  useEffect(() => {
    return () => {
      form.resetFields();
    };
  }, [isEditModal]);

  useEffect(() => {
    setDefaultFileList([
      ...[],
      {
        uid: uuidv4(),
        name: 'image',
        url: currentRow?.image?.img,
      },
    ]);
    return () => {
      setDefaultFileList([]);
    };
  }, [currentRow]);

  //Handle form
  const onCancel = () => {
    setIsEditModal(false);
  };

  const onFinish = async (values) => {
    console.log(values);
    try {
      setLoading(true);
      // create
      if (!currentRow) {
        console.log(values);
        if (!values.image.img || values?.image.img.length === 0) {
          setLoading(false);
          return message.error('Bạn phải up thêm ảnh nữa');
        }
        const imageUrl = await uploadFileToFirebase(
          values?.image?.img[0]?.originFileObj
        );
        if (values.status === undefined) values.status = false;
        const createData = {
          ...values,
          status: values.status ? true : false,
          image: { img: imageUrl },
        };
        await createSlider(createData)
          .then((result) => {
            if (result) {
              message.success('Thêm mới sliders thành công!');
            }
          })
          .catch((error) => message.error(error?.response?.data?.error));
        setLoading(false);
        onCallback();
      } else {
        //update
        const { image, ...updateObj } = values;
        let updateData = {
          ...updateObj,
          id: currentRow?._id,
          status: updateObj.status ? true : false,
        };

        if (image?.img[0]?.originFileObj) {
          const updateImageUrl = await uploadFileToFirebase(
            image?.img[0]?.originFileObj
          );
          updateData.image = { img: updateImageUrl };
        }

        console.log(updateData);
        await updateSlider(updateData)
          .then((result) => {
            console.log(result);
            message.success('Cập nhật sliders thành công!');
            setLoading(false);
            onCallback();
          })
          .catch((error) => {
            message.error(error?.response?.data?.error);
            setLoading(false);
          });
      }
    } catch (error) {
      console.log('errorTong', error);
      message.error(error.message);
      setLoading(false);
      return false;
    }
  };

  const initalValue = {
    title: currentRow ? currentRow?.title : undefined,
    backlink: currentRow ? currentRow?.backlink : undefined,
    notes: currentRow ? currentRow?.notes : undefined,
    status: currentRow ? currentRow?.status : undefined,
    thumbnail: currentRow
      ? getDefaultFileList(currentRow?.thumbnail)
      : undefined,
    image: currentRow
      ? {
          img: getDefaultFileList(currentRow?.image?.img),
        }
      : undefined,
  };

  return (
    <Modal
      title={currentRow ? 'Cập nhật slider' : 'Tạo slider'}
      visible={isEditModal}
      width={900}
      centered
      footer={null}
      forceRender={true}
      afterClose={() => {
        // console.log(defaultFileList);
        form.resetFields();
      }}
      onCancel={onCancel}
    >
      <Form
        colon={false}
        form={form}
        layout="vertical"
        requiredMark={true}
        initialValues={initalValue}
        labelWrap
        onFinish={(values) => onFinish(values)}
      >
        <Col lg={{ span: 24 }} xs={{ span: 24 }}>
          <Form.Item
            label="Tiêu đề"
            name="title"
            rules={[
              {
                required: true,
                message: 'Cần nhập tên sản phẩm!',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col lg={{ span: 24 }} xs={{ span: 24 }}>
          <Form.Item
            label="Backlink"
            name="backlink"
            rules={[
              {
                required: true,
                message: 'Cần nhập Backlink',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col lg={{ span: 24 }} xs={{ span: 24 }}>
          <Form.Item label="Trạng thái" name="status" valuePropName="checked">
            <Checkbox>Trạng thái</Checkbox>
          </Form.Item>
        </Col>
        <Col lg={{ span: 24 }} xs={{ span: 24 }}>
          <Form.Item
            label="Ghi chú"
            name="notes"
            rules={[
              {
                required: true,
                message: 'Cần nhập ghi chú',
              },
            ]}
          >
            <TextArea showCount maxLength={256} />
          </Form.Item>
        </Col>
        <Col lg={{ span: 24 }} xs={{ span: 24 }}>
          <Form.Item
            label="Ảnh"
            name={['image', 'img']}
            getValueFromEvent={normFile}
            style={{ width: '100%' }}
          >
            <Upload
              accept="image/*"
              maxCount={1}
              className="UploadImage"
              listType="picture-card"
              onChange={handleChange}
              defaultFileList={defaultFileList}
              beforeUpload={(file) => {
                beforeUpload(file);
              }}
              showUploadList={true}
              customRequest={fakeUpload}
              onRemove={onRemove}
              // fileList={fileList}
            >
              {uploadButton}
            </Upload>
          </Form.Item>
        </Col>
        <div
          className="ant-modal-footer"
          style={{ marginLeft: -24, marginRight: -24, marginBottom: -24 }}
        >
          <Row gutter={24} type="flex" style={{ textAlign: 'right' }}>
            <Col
              className="gutter-row"
              span={24}
              style={{ textAlign: 'right' }}
            >
              <Button
                type="clear"
                onClick={onCancel}
                style={{ fontWeight: 'bold' }}
              >
                {'Cancel'}
              </Button>
              {loading === false ? (
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ fontWeight: 'bold' }}
                >
                  {'Save'}
                </Button>
              ) : (
                <Button type="primary" loading style={{ fontWeight: 'bold' }}>
                  {'Loading'}
                </Button>
              )}
            </Col>
          </Row>
        </div>
      </Form>
    </Modal>
  );
};

export default SliderEdit;
