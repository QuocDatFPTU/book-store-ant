import { Breadcrumb, Layout, Menu } from "antd";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import logoImg from "assets/logo-new.png";
const { Header, Content, Footer } = Layout;

const HomePage = () => {
    return (
        <Layout className="layout">
            <Header>
                <div className="logo" >
                    <img src={logoImg} alt="logo image" />
                </div>
                <div className="header_search__form">

                </div>
                <Menu
                    theme="dark"
                    mode="horizontal"
                // items={new Array(15).fill(null).map((_, index) => {
                //     const key = index + 1;
                //     return {
                //         key,
                //         label: `nav ${key}`,
                //     };
                // })}
                >

                    <Menu.Item title="Home" key="2" >
                        <span>Home</span>
                        <Link to="/" />
                    </Menu.Item>
                    <Menu.Item title="Profile" key="1">
                        <span>Profile</span>
                        <Link to="/profile" />
                    </Menu.Item>

                    {/* <NavLink to="/">
                        <Menu.Item title="Home" key="2" >Home</Menu.Item>/
                    </NavLink> */}
                </Menu>
            </Header>
            <Content
                style={{
                    padding: "0 50px"
                }}
            >
                <div className="site-layout-content">Content</div>
            </Content>
            <Footer
                style={{
                    textAlign: "center"
                }}
            >
                Ant Design ©2018 Created by Ant UED
            </Footer>
        </Layout>
    );
};

export default HomePage;
