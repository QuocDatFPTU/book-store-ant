import { Col, Layout, Row } from 'antd';
import React from 'react';

import paymentImg from 'assets/footer-payment.png';
import socialtImg from 'assets/footer-social.png';
import appImg from 'assets/footer-app.png';
import logo from 'assets/logo_2.png';
import WrapperConentContainer from './wrapper.content';

const { Footer } = Layout;

const FooterContainer = () => {
  return (
    <Footer
      style={{
        paddingLeft: '0',
        paddingRight: '0',
        backgroundColor: 'white',
        marginTop: '40px',
      }}
    >
      <WrapperConentContainer>
        <Row>
          <Col className="store-footer-left" span={6}>
            {/* <h1 style={{ color: 'red' }}>KULI TEAM</h1> */}
            <div>
              <img src={logo} style={{
                'width': '200px',
                'height': '80px',
                'objectFit': 'cover'
              }} />
            </div>
            <p style={{ fontWeight: '500', textAlign: 'justify' }}>
              Kuli cửa hàng được thành lập với mục đích làm website, chuyên nhận
              làm thuê website, giá cả phải chăng, muốn biết thêm thông tin xin
              vui lòng liên hệ chỉ tiết Kuli team
            </p>
          </Col>
          <Col className="store-footer-center" span={5} offset={1}>
            <h3>Phương thức thanh toán</h3>
            <img
              style={{
                width: '90%',
                objectFit: 'cover',
              }}
              src={paymentImg}
              alt=""
            />
          </Col>
          <Col className="store-footer-center" span={5} offset={1}>
            <h3>Tải ứng dụng trên điện thoại</h3>
            <img
              style={{
                objectFit: 'cover',
              }}
              src={appImg}
              alt=""
            />
          </Col>
          <Col className="store-footer-center" span={5} offset={1}>
            <h3>Kết nối với chúng tôi</h3>
            <img
              style={{
                objectFit: 'cover',
              }}
              src={socialtImg}
              alt=""
            />
          </Col>
        </Row>
      </WrapperConentContainer>
    </Footer>
  );
};

export default FooterContainer;
