import { EditOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Input, Layout, PageHeader, Row } from "antd";
import { pickBy } from "lodash";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TableCustom from "../../../components/TableCustom";
import { defaultPage } from "../../../util/constant";
import StudentEdit from "./student.edit";
import { getStudentList } from "./student.service";

const defaultSort = {
  "is-ascending": "true",
  "order-by": "Id"
};
const StudentList = () => {
  const navigate = useNavigate();
  const [studentList, setStudentList] = useState([]);
  const [student, setStudent] = useState();

  const [loading, setLoading] = useState(false);
  const [isEditModal, setIsEditModal] = useState(false);
  // Pagination
  const [params, setParams] = useState({ ...defaultPage });
  const [totalItem, setTotalItem] = useState();
  const [sortedInfo] = useState(defaultSort);
  const [form] = Form.useForm();

  const fetchStudent = (params, sortedInfo) => {
    setLoading(true);
    getStudentList({ "uni-id": 1, ...params, ...sortedInfo })
      .then((result) => {
        setStudentList([...result.data.items]);
        setTotalItem(result.data["total-count"]);
        setLoading(false);
      })
      .catch((e) => setLoading(false));
  };

  useEffect(() => {
    fetchStudent(params, sortedInfo);
  }, [params, sortedInfo]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "12%"
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      width: "12%",
      render: (gender) => <>{gender ? "Male" : "Female"}</>
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: "12%"
    },
    {
      title: "Department",
      dataIndex: "dep-id",
      key: "dep-id",
      width: "12%"
    },
    {
      title: "Action",
      align: "center",
      width: "8%",
      fixed: "right",
      render: (text, record) => (
				<div style={{ display: "flex", justifyContent: "space-around" }}>
					<Button
						onClick={() => {
						  const student = studentList.find((stu) => stu.id === record.id);
						  setStudent(student);
						  setIsEditModal(true);
						}}
						type="link"
						size="small"
						icon={<EditOutlined />}
					/>
				</div>
      )
    }
  ];

  const extraButton = [
		<Button
			key="btn-complete"
			type="primary"
			onClick={() => {
			  setStudent();
			  setIsEditModal(true);
			}}
		>
			{"Create"}
			<PlusOutlined />
		</Button>
  ];

  const routes = [
    {
      path: "index",
      breadcrumbName: "Dashboard"
    },
    {
      path: "first",
      breadcrumbName: "Department"
    }
  ];

  return (
		<Layout className="layoutContent">
			<PageHeader
				ghost={false}
				title="Student"
				extra={extraButton}
				breadcrumb={routes}
				className="customPageHeader"
			/>
			<Layout.Content>
				<Card size="small" className="cardSearch">
					<Form
						form={form}
						layout="horizontal"
						className="customFormSearch"
						onFinish={(value) => {
						  const cleanValue = pickBy(
						    value,
						    (v) => v !== undefined && v !== ""
						  );
						  setParams({
						    ...cleanValue,
						    "page-number": 1,
						    "page-size": params["page-size"]
						  });
						}}
					>
						<Row gutter={16}>
							<Col xxl={{ span: 6 }} md={8} sm={12} xs={24}>
								<Form.Item name="search-value">
									<Input placeholder="keyword" allowClear={true} />
								</Form.Item>
							</Col>
							<Col>
								<Form.Item>
									<Button
										type="primary"
										ghost
										icon={<SearchOutlined />}
										htmlType="submit"
									>
										{"Search"}
									</Button>
								</Form.Item>
							</Col>
						</Row>
					</Form>
				</Card>
				<TableCustom
					title={() => (
						<Row>
							<Col span={12}>
								<h3> {"Event List"}</h3>
							</Col>
						</Row>
					)}
					rowKey="id"
					loading={loading}
					bordered
					columns={columns}
					dataSource={studentList}
					onChange={(pagination, filters, sorter) => {
					  window.scrollTo({ top: 0, behavior: "smooth" });
					  if (pagination.pageSize !== params["page-size"]) {
					    params["page-number"] = 1;
					  } else {
					    params["page-number"] = pagination.current;
					  }
					  params["page-size"] = pagination.pageSize;
					  setParams({ ...params });
					}}
					pagination={{
					  total: totalItem,
					  showSizeChanger: true,
					  pageSize: params["page-size"],
					  current: params["page-number"]
					}}
					scroll={{ x: 1200 }}
				/>
			</Layout.Content>
			<StudentEdit
				item={student}
				onCallback={(value) => {
				  setParams({ ...defaultPage });
				  setIsEditModal(false);
				}}
				isEditModal={isEditModal}
				setIsEditModal={setIsEditModal}
			/>
		</Layout>
  );
};

export default StudentList;
