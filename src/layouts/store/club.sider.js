import React, { useState } from "react";
import {
  CalendarOutlined,
  FileOutlined,
  TeamOutlined
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import logo from "../../assets/u1.png";
import "./styles.less";
import { useNavigate } from "react-router-dom";
const { Sider } = Layout;
const { SubMenu } = Menu;

const ClubSider = () => {
  const [collapse, setCollapse] = useState(true);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  return (
		<Sider
			className="sider"
			collapsible
			style={{ minHeight: "100vh" }}
			onCollapse={() => setCollapse(!collapse)}
			theme="light"
		>
			{collapse === true
			  ? (
				<div className="logo-wrapper">
					<img
						src={logo}
						alt="logo"
						style={{ height: 60 }}
						className="logo"
						onClick={() => navigate("/dashboard")}
					/>
				</div>
			    )
			  : (
				<div className="logo-wrapper">
					<img
						src={logo}
						alt="logo"
						style={{ width: 80, height: 60 }}
						className="logoCollapse"
					/>
				</div>
			    )}
			<Menu theme="light" mode="inline" clasName="menu-list">
				<Menu.Item
					key="1"
					icon={<CalendarOutlined />}
					onClick={() => navigate("/club/event")}
				>
					Event
				</Menu.Item>
				<Menu.Item
					key="2"
					icon={<TeamOutlined />}
					onClick={() => navigate("/club/member")}
				>
					Member
				</Menu.Item>
			</Menu>
		</Sider>
  );
};

export default ClubSider;
