import { Col, Row } from 'antd';
import React from 'react';

const WrapperConentContainer = (props) => {
  return (
    <Row>
      <Col span={16} offset={4}>
        {props.children}
      </Col>
    </Row>
  );
};

export default WrapperConentContainer;
