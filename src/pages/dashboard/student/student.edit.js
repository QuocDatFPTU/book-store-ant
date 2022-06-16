import React, { useEffect, useState } from "react";
import {
  Col,
  Form,
  Modal,
  Upload,
  Row,
  Input,
  Button,
  message,
  DatePicker,
  Select
} from "antd";
import moment from "moment";
import { Option } from "antd/lib/mentions";
const StudentEdit = ({ item, onCallback, isEditModal, setIsEditModal }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    return () => {
      form.resetFields();
    };
  }, [isEditModal]);
  const onCancel = () => {
    setIsEditModal(false);
  };
  const onFinish = async () => {};
  const initalValue = {
    "user-name": item ? item["user-name"] : "",
    name: item ? item.name : "",
    gender: item ? item.gender : true,
    address: item ? item.address : "",
    "date-of-birth": item ? moment(item["date-of-birth"]) : "",
    "dep-id": item ? item["date-of-birth"] : "",
    password: ""
  };
  return (
		<Modal
			title={item ? "Edit Student" : "Create Student"}
			visible={isEditModal}
			width={480}
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
				requiredMark={false}
				initialValues={initalValue}
				onFinish={(values) => onFinish(values)}
			>
				<Col span={24}>
					<Col lg={{ span: 24 }} xs={{ span: 24 }}>
						<Form.Item
							label="Name"
							name="name"
							rules={[
							  {
							    required: true,
							    message: "Name must be entered!"
							  }
							]}
						>
							<Input />
						</Form.Item>
					</Col>
					<Col lg={{ span: 24 }} xs={{ span: 24 }}>
						<Form.Item
							label="Address"
							name="address"
							rules={[
							  {
							    required: true,
							    message: "Address must be entered!"
							  }
							]}
						>
							<Input />
						</Form.Item>
					</Col>
					<Col lg={{ span: 24 }} xs={{ span: 24 }}>
						<Form.Item
							label="Gender"
							rules={[
							  {
							    required: true,
							    message: "Gender must be entered!"
							  }
							]}
						>
							<Select name="gender" value={item ? item.gender : true}>
								<Option value="true">Male</Option>
								<Option value="false">Female</Option>
							</Select>
						</Form.Item>
					</Col>
					<Col lg={{ span: 24 }} xs={{ span: 24 }}>
						<Form.Item
							label="Date of birth"
							name="date-of-birth"
							rules={[
							  {
							    required: true,
							    message: "Address must be entered!"
							  }
							]}
						>
							<DatePicker />
						</Form.Item>
					</Col>
					{!item && (
						<Col lg={{ span: 24 }} xs={{ span: 24 }}>
							<Form.Item
								label="Password"
								name="password"
								rules={[
								  {
								    required: true,
								    message: "Address must be entered!"
								  }
								]}
							>
								<Input />
							</Form.Item>
						</Col>
					)}
				</Col>
			</Form>
		</Modal>
  );
};
export default StudentEdit;
