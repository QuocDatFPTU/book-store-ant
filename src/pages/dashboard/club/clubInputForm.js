import { Form, Input, Button, Card, DatePicker } from "antd";
import { useParams } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { createClub, getClubByID } from "./clubServices";
import { IdContext } from "../../../components/CustomTable";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 12 }
};

const validateMessages = {
  required: "${label} is required!"
};

const ClubForm = (props) => {
  const [form] = Form.useForm();
  const onFill = (club) => {
    form.setFieldsValue({
      "club-name": club["club-name"],
      "short-description": club["short-description"],
      "short-name": club["short-name"],
      "short-description": club["short-description"],
      slogan: club.slogan,
      description: club["short-description"]
    });
  };

  useEffect(() => {
    if (props.club != null) {
      onFill(props.club);
    }
  }, []);

  return (
		<Form
			form={form}
			{...layout}
			onFinish={(club) => props.onFinish(club)}
			name="nest-messages"
			validateMessages={validateMessages}
		>
			<Form.Item
				name={"club-name"}
				label="Club name"
				rules={[{ required: true }]}
			>
				<Input />
			</Form.Item>
			<Form.Item
				name={"short-name"}
				label="Short name"
				rules={[{ required: true }]}
			>
				<Input />
			</Form.Item>
			<Form.Item
				name={"description"}
				label="Description"
				rules={[{ required: true }]}
			>
				<Input />
			</Form.Item>
			<Form.Item
				name={"short-description"}
				label="Short description"
				rules={[{ required: true }]}
			>
				<Input />
			</Form.Item>
			<Form.Item name={"slogan"} label="Slogan" rules={[{ required: true }]}>
				<Input />
			</Form.Item>
			<Form.Item wrapperCol={{ offset: 10, span: 16 }}>
				<Button type="primary" htmlType="submit">
					Submit
				</Button>
			</Form.Item>
		</Form>
  );
};

export const ClubCreate = () => {
  const onFinish = async (club) => {
    // TODO Call create api
    console.log(club);
    const res = await createClub(club);
    console.log(res);
  };
  return <ClubForm onFinish={onFinish} />;
};

export const ClubEdit = () => {
  const [club, setClub] = useState(null);
  const { id } = useContext(IdContext);
  useEffect(() => {
    const getData = async () => {
      const res = await getClubByID(id);
      setClub(res);
    };
    getData();
  }, []);
  const onFinish = (e) => {
    // TODO Call edit api
    console.log(e);
  };
  return club == null ? <p></p> : <ClubForm club={club} onFinish={onFinish} />;
};
