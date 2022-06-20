import React, { useState } from "react";
import { Layout, Menu, Badge, Avatar, Dropdown } from "antd";
import {
  DownOutlined,
  CalendarOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  BellOutlined,
  EditOutlined,
  LoginOutlined
} from "@ant-design/icons";
import logo from "../../assets/u1.png";
import "./styles.less";
import { useNavigate, Outlet } from "react-router-dom";
const { Header, Sider } = Layout;
const { SubMenu } = Menu;

// import logo from "assets/logo.png";

const ClubLayout = () => {
  const [collapse, setCollapse] = useState(true);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const menu = (
		<Menu
			onClick={(e) => {
			  if (e.key == 1) {
			    localStorage.clear();
			    navigate("/");
			  }
			}}
		>
			<Menu.Item key="0" disabled style={{ cursor: "default" }}>
				<div>{localStorage.getItem("email")}</div>
			</Menu.Item>
			<Menu.Divider />
			<Menu.Item key="1">
				<LoginOutlined /> {"Log out"}
			</Menu.Item>
		</Menu>
  );

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
  };

  return (
		<Layout className="dashboard-layout">
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
					<Menu.Item
						key="3"
						icon={<FileOutlined />}
						onClick={() => navigate("/club/recruitment")}
					>
						Recruitment
					</Menu.Item>
				</Menu>
			</Sider>
			<Layout>
				<Header className="header">
					{
						<div className="header-container">
							<div className="profile-container">
								<Dropdown overlay={menu}>
									<div className="profile">
										<Avatar size="large" icon={<UserOutlined />} />
										<div
											style={{
											  color: "white",
											  fontWeight: 600,
											  marginRight: 6,
											  marginLeft: 3
											}}
										>
											{localStorage.getItem("name")}
										</div>
										<DownOutlined
											style={{
											  fontSize: "14px",
											  color: "white",
											  paddingTop: 1
											}}
											theme="outlined"
										/>
									</div>
								</Dropdown>
								<div id="space" />
								<Dropdown
									placement="bottomCenter"
									style={{ top: 75 }}
									overlay={
										<Menu style={{ marginTop: 22 }}>
											<Menu.Item key="0">
												<a
													target="_blank"
													rel="noopener noreferrer"
													href="https://www.antgroup.com"
												>
													1st menu item
												</a>
											</Menu.Item>
											<Menu.Item key="1">
												<a
													target="_blank"
													rel="noopener noreferrer"
													href="https://www.aliyun.com"
												>
													2nd menu item
												</a>
											</Menu.Item>
											<Menu.Divider />
											<Menu.Item key="3" disabled>
												3rd menu item（disabled）
											</Menu.Item>
										</Menu>
									}
								>
									<Badge dot>
										<BellOutlined style={{ fontSize: 24, color: "white" }} />
									</Badge>
								</Dropdown>
							</div>
						</div>
					}
				</Header>
				<Outlet />
			</Layout>
		</Layout>
  );
};

export default ClubLayout;
