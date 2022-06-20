import {
  Col,
  PageHeader,
  Row,
  Upload,
  Form,
  Input,
  DatePicker,
  Switch,
  Layout,
  Button,
  InputNumber,
  Spin
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import { Content } from "antd/lib/layout/layout";
import moment from "moment";
import React, { useState } from "react";
import { success } from "../../../components/CustomSuccessModal";
import {
  formatDate,
  formatDateTimeFull,
  formatDateYearFirst
} from "../../../util/constant";
import { createUni } from "./university.service";
const UniCreate = () => {
  const [event, setEvent] = useState(null);

  const onFinish = async (values) => {
    values.EstablishedDate = moment(
      values.EstablishedDate,
      formatDate
    ).format(formatDateYearFirst);
    values.UploadedLogo = "";
    const res = await createUni(values);
    if (res != null) {
      success("Add success");
    }
  };

  return (
		<Layout className="layoutContent">
			<PageHeader
				onBack={() => window.history.back()}
				ghost={false}
				title="Create Event"
				className="customPageHeader"
			/>
			<Content style={{ backgroundColor: "white" }}>
				<div className="site-layout-content">
					<Form onFinish={onFinish} layout="vertical">
						<Row>
							<Col offset={4} span={5}>
								<Form.Item name="UploadedLogo" label="University Image">
									<Upload
										accept="image/*"
										maxCount={1}
										className="UploadImage"
										listType="picture-card"
									>
										{"+ Upload "}
									</Upload>
								</Form.Item>
							</Col>
							<Col span={8}>
								<Form.Item
									name="UniName"
									label="University name"
									rules={[
									  {
									    required: true,
									    message: "Event name must be entered!"
									  }
									]}
								>
									<Input />
								</Form.Item>
								<Form.Item
									name="ShortName"
									label="Short name"
									rules={[
									  {
									    required: true,
									    message: "Event name must be entered!"
									  }
									]}
								>
									<Input />
								</Form.Item>
								<Form.Item
									name="UniAddress"
									label="Address"
									rules={[
									  {
									    required: true,
									    message: "Address must be entered!"
									  }
									]}
								>
									<Input />
								</Form.Item>
								<Form.Item
									name="UniPhone"
									label="Phone"
									rules={[
									  {
									    required: true,
									    message: "Phone must be entered!"
									  }
									]}
								>
									<Input />
								</Form.Item>
								<Form.Item
									name="Slogan"
									label="Slogan"
									rules={[
									  {
									    required: true,
									    message: "Slogan must be entered!"
									  }
									]}
								>
									<TextArea autoSize={{ minRows: 3, maxRows: 5 }} />
								</Form.Item>
								<Form.Item
									name="EstablishedDate"
									label="Established date"
									rules={[
									  {
									    required: true,
									    message: "Date must be entered!"
									  }
									]}
								>
									<DatePicker />
								</Form.Item>
								<Form.Item
									name="Website"
									label="Website"
									rules={[
									  {
									    required: true,
									    message: "Website participants must be entered!"
									  }
									]}
								>
									<Input />
								</Form.Item>
								<Form.Item name="is-private">
									<Button type="primary" htmlType="submit">
										Create
									</Button>
								</Form.Item>
							</Col>
						</Row>
					</Form>
				</div>
			</Content>
		</Layout>
  );
};

export default UniCreate;
