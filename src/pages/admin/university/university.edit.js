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
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { success } from "../../../components/CustomSuccessModal";
import {
  formatDate,
  formatDateTimeFull,
  formatDateYearFirst
} from "../../../util/constant";
import { getUniById, updateUni } from "./university.service";
const UniEdit = () => {
  const [event, setEvent] = useState(null);
  const { id } = useParams();
  console.log(id);
  const fetchEvent = async (id) => {
    const res = await getUniById(id);
    console.log(res.data);
    setEvent(res.data);
  };

  useEffect(() => {
    console.log(id);
    fetchEvent(id);
  }, []);

  const onFinish = async (values) => {
    const input = {
      Id: id,
      UniName: values["uni-name"],
      UniAddress: values["uni-address"],
      UniPhone: values["uni-phone"],
      LogoUrl: values["logo-url"],
      Slogan: values.slogan,
      EstablishedDate: moment(values["established-date"], formatDate).format(
        formatDateYearFirst
      ),
      Website: values.website,
      ShortName: values["short-name"]
    };
    const res = await updateUni(input);
    console.log(res);
    if (res != null) {
      success("Edit success");
    }
  };

  return event == null
    ? (
		<Spin size="large" />
      )
    : (
		<Layout className="layoutContent">
			<PageHeader
				onBack={() => window.history.back()}
				ghost={false}
				title="Edit Event"
				className="customPageHeader"
			/>
			<Content style={{ backgroundColor: "white" }}>
				<div className="site-layout-content">
					<Form
						initialValues={{
						  id: event.id,
						  "uni-name": event["uni-name"],
						  "uni-address": event["uni-address"],
						  "uni-phone": event["uni-phone"],
						  "logo-url": event["logo-url"],
						  slogan: event.slogan,
						  "established-date": moment(event["established-date"]),
						  website: event.website,
						  "short-name": event["short-name"],
						  "is-deleted": event["is-deleted"]
						}}
						onFinish={onFinish}
						layout="vertical"
					>
						<Row>
							<Col offset={4} span={5}>
								<Form.Item name="logo-url" label="University Image">
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
									name="uni-name"
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
									name="short-name"
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
									name="uni-address"
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
									name="uni-phone"
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
									name="slogan"
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
									name="established-date"
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
									name="website"
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
										Edit
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

export default UniEdit;
