/* eslint-disable react/prop-types */
import { PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  message,
  Modal,
  Row,
  Select,
  Upload,
} from 'antd';
import TextEditor from 'components/TextEditor';
import 'moment/locale/vi';
import { useEffect, useState } from 'react';
import {
  beforeUpload,
  fakeUpload,
  normFile,
  uploadFileToFirebase,
  uuidv4,
} from 'util/file';
import { createPost, updatePost } from './post.service';

const PostEdit = ({
  currentRow,
  onCallback,
  isEditModal,
  setIsEditModal,
  categoryList,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [defaultFileList, setDefaultFileList] = useState([]);
  const { TextArea } = Input;

  const getDefaultFileList = (record) => {
    return [
      {
        uid: uuidv4(),
        name: 'image',
        url: record,
      },
    ];
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
        url: Row?.thumbnail,
      },
    ]);
    return () => {
      setDefaultFileList([]);
    };
  }, [currentRow]);

  const onCancel = () => {
    setIsEditModal(false);
  };

  const onFinish = async (values) => {
    try {
      setLoading(true);
      // create
      if (!currentRow) {
        if (!values.thumbnail || values?.thumbnail.length === 0) {
          setLoading(false);
          return message.error('Bạn phải up thêm ảnh nữa');
        }
        const imageUrl = await uploadFileToFirebase(
          values?.thumbnail[0]?.originFileObj
        );
        if (values.status === undefined) values.status = false;
        if (values.featured === undefined) values.featured = false;
        const createData = {
          ...values,
          thumbnail: imageUrl,
        };
        await createPost(createData)
          .then((result) => {
            if (result) {
              message.success('Thêm mới post thành công!');
            }
          })
          .catch((error) => message.error(error?.response?.data?.error));
        setLoading(false);
        onCallback();
      }
      //Edit
      else {
        //Update có ảnh
        if (values?.thumbnail[0]?.originFileObj) {
          const updateImageUrl = await uploadFileToFirebase(
            values?.thumbnail[0]?.originFileObj
          );
          delete values.thumbnail;
          const updateData = {
            ...values,
            id: currentRow?._id,
            thumbnail: updateImageUrl,
          };
          await updatePost(updateData)
            .then((result) => {
              // console.log(result);
              message.success('Cập nhật post thành công!');
              setLoading(false);
              onCallback();
            })
            .catch((error) => {
              message.error(error?.response?.data?.error);
              setLoading(false);
            });
        }
        //Không update ảnh
        else {
          delete values.thumbnail;
          const updateData = {
            ...values,
            id: currentRow?._id,
            thumbnail: currentRow?.thumbnail,
          };
          // const { author, category, ...updateDataFinal } = updateData;
          updatePost(updateData)
            .then((result) => {
              message.success('Cập nhật post thành công!');
              setLoading(false);
              onCallback();
            })
            .catch((error) => {
              console.log('error2', error);
              message.error(error?.response?.data?.error);
              setLoading(false);
            });
        }
      }
    } catch (error) {
      console.log('errorTong', error);
      message.error(error.message);
      setLoading(false);
      return false;
    }
  };

  const onRemove = async (file) => {
    const index = fileList.indexOf(file);
    const newFileList = fileList.slice();
    newFileList.splice(index, 1);

    setFileList(newFileList);
  };
  const handleChange = ({ fileList }) =>
    setFileList(fileList.filter((file) => file.status !== 'error'));

  const categoryOptions = categoryList.map((data) => {
    return {
      label: data?.name,
      value: data?._id,
    };
  });

  const initalValue = {
    title: currentRow ? currentRow?.title : undefined,
    brief: currentRow ? currentRow?.brief : undefined,
    author: currentRow ? currentRow?.author : undefined,
    description: currentRow ? currentRow?.description : undefined,
    status: currentRow ? currentRow?.status : undefined,
    featured: currentRow ? currentRow?.featured : undefined,
    thumbnail: currentRow
      ? getDefaultFileList(currentRow?.thumbnail)
      : undefined,
    category: currentRow ? currentRow?.category._id : undefined,
  };

  return (
    <Modal
      title={currentRow ? 'Cập nhật blog' : 'Tạo blog'}
      visible={isEditModal}
      width={900}
      centered
      footer={null}
      forceRender={true}
      afterClose={() => {
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
            label="Nội dung vắn tắt"
            name="brief"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập nội dung tóm tắt',
              },
            ]}
          >
            <TextArea
              showCount
              maxLength={135}
              style={{
                height: 120,
              }}
            />
          </Form.Item>
        </Col>
        {/* <Col lg={{ span: 24 }} xs={{ span: 24 }}>
          <Form.Item
            label="Tác giả"
            name="author"
            rules={[
              {
                required: true,
                message: 'Cần nhập tên tác giả!',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col> */}
        <Col lg={{ span: 24 }} xs={{ span: 24 }}>
          <Form.Item
            label="Loại"
            name="category"
            rules={[
              {
                required: true,
                message: 'Cần chọn loại !',
              },
            ]}
          >
            <Select placeholder="Hãy chọn thể loại" options={categoryOptions} />
          </Form.Item>
        </Col>
        <Col lg={{ span: 24 }} xs={{ span: 24 }}>
          <Form.Item label="Đặc biệt" name="featured" valuePropName="checked">
            <Checkbox>Đặc biệt</Checkbox>
          </Form.Item>
        </Col>
        <Col lg={{ span: 24 }} xs={{ span: 24 }}>
          <Form.Item label="Trạng thái" name="status" valuePropName="checked">
            <Checkbox>Trạng thái</Checkbox>
          </Form.Item>
        </Col>
        <Col lg={{ span: 24 }} xs={{ span: 24 }}>
          <Form.Item
            name="thumbnail"
            label={'Thumbnail'}
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
                return beforeUpload(file);
              }}
              showUploadList={true}
              customRequest={fakeUpload}
              onRemove={onRemove}
            >
              {uploadButton}
            </Upload>
          </Form.Item>
        </Col>
        <Col lg={{ span: 24 }} xs={{ span: 24 }} style={{ height: '300px' }}>
          <Form.Item
            label="Nội dung"
            name="description"
            rules={[
              {
                required: true,
                message: 'Cần nhập nội dung!',
              },
            ]}
          >
            <TextEditor style={{ height: '200px' }} />
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
                {'Hủy'}
              </Button>
              {loading === false ? (
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ fontWeight: 'bold' }}
                >
                  {'Lưu'}
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

export default PostEdit;
