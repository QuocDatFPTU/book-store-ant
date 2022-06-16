import React, { useEffect, useState } from "react";
import { EditOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Col, Form, Modal, Upload, Row, Input, Button, message } from "antd";

import { createDepartment, updateDepartment } from "./department.service";
const DepaEdit = ({ item, onCallback, isEditModal, setIsEditModal }) => {
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
  const onFinish = async (values) => {
    try {
      setLoading(true);
      // create
      if (!item) {
        const createData = {
          ...values
        };
        await createDepartment(createData)
          .then(message.success("Create department successfully!"))
          .catch((error) => message.error(error.message));
        setLoading(false);
        onCallback();
      } // update
      else {
        const updateData = {
          ...values
        };
        await updateDepartment(updateData)
          .then((result) => {
            message.success("Update department successfully");
            setLoading(false);
            onCallback();
          })
          .catch((error) => {
            message.error(error.message);
            setLoading(false);
          });
      }
    } catch (error) {
      message.error(error.message);
      setLoading(false);
      return false;
    }
  };

  const initalValue = {
    id: item ? item.id : undefined,
    "dep-name": item ? item["dep-name"] : "",
    "short-name": item ? item["short-name"] : ""
  };
  return (
		<Modal
			title={item ? "Edit Department" : "Create Department"}
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
					{item && (
						<Col lg={{ span: 24 }} xs={{ span: 24 }}>
							<Form.Item
								label="ID"
								name="id"
								rules={[
								  {
								    required: true,
								    message: "ID must be entered!"
								  }
								]}
							>
								<Input disabled={true} />
							</Form.Item>
						</Col>
					)}
					<Col lg={{ span: 24 }} xs={{ span: 24 }}>
						<Form.Item
							label="Department Name"
							name="dep-name"
							rules={[
							  {
							    required: true,
							    message: "Club name must be entered!"
							  }
							]}
						>
							<Input />
						</Form.Item>
					</Col>
					<Col lg={{ span: 24 }} xs={{ span: 24 }}>
						<Form.Item
							label="Short Name"
							name="short-name"
							rules={[
							  {
							    required: true,
							    message: "Club name must be entered!"
							  }
							]}
						>
							<Input />
						</Form.Item>
					</Col>
					<div
						className="ant-modal-footer"
						style={{ marginLeft: -24, marginRight: -24, marginBottom: -24 }}
					>
						<Row gutter={24} type="flex" style={{ textAlign: "right" }}>
							<Col
								className="gutter-row"
								span={24}
								style={{ textAlign: "right" }}
							>
								<Button
									type="clear"
									onClick={onCancel}
									style={{ fontWeight: "bold" }}
								>
									{"Cancel"}
								</Button>
								{loading === false
								  ? (
									<Button
										type="primary"
										htmlType="submit"
										style={{ fontWeight: "bold" }}
									>
										{"Save"}
									</Button>
								    )
								  : (
									<Button type="primary" loading style={{ fontWeight: "bold" }}>
										{"Loading"}
									</Button>
								    )}
							</Col>
						</Row>
					</div>
				</Col>
			</Form>
		</Modal>
  );
};

export default DepaEdit;
