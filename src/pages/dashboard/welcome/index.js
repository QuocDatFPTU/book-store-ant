import React from "react";
import { Col, Layout, Row } from "antd";
import logo from "../../../assets/u1.png";
import test from "../../../assets/test.jpg";
import "./styles.less";
const Welcome = () => {
  return (
    <Layout className="welcome-page">
      <Row justify="space-between" style={{ height: window.innerHeight - 64 }}>
        <Col
          xs={{ span: 24 }}
          style={{
            backgroundImage: `url(${test})`,
            width: "100%",
            backgroundSize: "cover",
            overflow: "hidden"
          }}
        >
          <div
            className="wrapDes"
            style={{ marginTop: window.innerHeight / 2 - 150 }}
          >
            <div className="wrapLogo">
              <img
                src={logo}
                className="logo"
                alt="uniclub"
                style={{ height: 115 }}
              />
            </div>
            <div style={{ borderLeft: "1px solid white" }} />
            <div className="uniclub">
              <div>{"UniClub"}</div>
              <div>{"Event management system"}</div>
            </div>
          </div>
        </Col>
      </Row>
    </Layout>
  );
};

export default Welcome;
