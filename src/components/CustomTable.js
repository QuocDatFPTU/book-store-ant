import React from 'react';
import { Table } from 'antd';

const TableCustom = ({ ...props }) => {
  return <Table size="small" {...props} />;
};
export default TableCustom;
