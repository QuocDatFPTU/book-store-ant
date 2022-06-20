import { Col, Layout, Row } from 'antd';
import React from 'react';

import paymentImg from 'assets/footer-payment.png';
import socialtImg from 'assets/footer-social.png';
import appImg from 'assets/footer-app.png';
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
            <h1 style={{ color: 'red' }}>KULI TEAM</h1>
            <p style={{ fontWeight: '500', textAlign: 'justify' }}>
              Kuli cửa hàng được thành lập với mục đích gì cũng éo biết nhưng
              chỉ biết đơn giản là éo biết thôi, cái gì cũng nhờ đến bố m à?????
              ở đâu cũng vậy thôi mong chờ cc
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
