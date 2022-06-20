import React from "react";
import { Typography } from "antd";

const { Text } = Typography;

export const clubColumns = [
  {
    title: "Club name",
    dataIndex: "club-name"
  },
  {
    title: "Short name",
    dataIndex: "short-name"
  },
  {
    title: "Members",
    dataIndex: "member-count"
  },
  {
    title: "Action",
    dataIndex: "id",
    render: (id) => {
      return (
				<Text style={{ cursor: "pointer" }} type="warning">
					Edit
				</Text>
      );
    }
  }
];

export const clubRoutes = [
  {
    path: "index",
    breadcrumbName: "Dashboard"
  },
  {
    path: "first",
    breadcrumbName: "Club"
  }
];
