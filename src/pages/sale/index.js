import React, { useEffect, useState } from 'react'
import { Card, Col, Layout, PageHeader, Row } from 'antd'
import TableCustom from 'components/CustomTable'
import { getDashboardMarketing } from './dashboard.service';
import { firstColumns, firstData, secondColumns, secondData, labels, thridColumns, thridData } from './constants';
import faker from 'faker';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);


function SaleDashboard() {
    const [params, setParams] = useState();
    const [loading, setLoading] = useState(false);
    const [dataMarketing, setDataMarketing] = useState();
    const [data, setData] = useState([]);
    const [dataSaleLatestOrder, setDataSaleLatestOrder] = useState();
    const [dataLatestTotalOrders, setDataLatestTotalOrders] = useState();
    const [dataRevenues, setDataRevenues] = useState();
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Doanh thu ',
            },
        },
    };

    const dataChart = {
        labels,
        datasets: [
            {
                label: 'Doanh thu',
                data: [0, 1099232, 5699342, 4561232, 7893211, 4513589, 2341321],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

    const fetchDashboardData = () => {
        setLoading(true);
        getDashboardMarketing()
            .then((result) => {
                setDataSaleLatestOrder(result?.latestSuccessOrders);
                setDataLatestTotalOrders(result?.latestTotalOrders);
                setDataRevenues(result?.revenues);
                // setTotalItem(result?.count);
                setLoading(false);
            })
            .catch((e) => setLoading(false));
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    return (
        <Layout className="layoutContent">
            <PageHeader
                ghost={false}
                title="Dashboard"
                // extra={extraButton}
                className="customPageHeader"
            />
            <Layout.Content>
                <Row style={{ marginBottom: '10px' }}>
                    <Col >
                        <TableCustom columns={thridColumns} dataSource={dataLatestTotalOrders} scroll={{ y: 320 }} title={() => <span style={{ fontSize: "bold" }}>Tổng đơn hàng</span>} pagination={false} />
                    </Col>
                </Row>
                <Row style={{ height: 400, marginBottom: 40, marginTop: 40 }}>
                    {/* // top 5 post gần đây (dùng table) */}
                    <Col lg={{ span: 11 }} style={{ marginLeft: '10px', marginRight: '20px' }}>
                        <TableCustom columns={firstColumns} dataSource={dataSaleLatestOrder} scroll={{ y: 320 }} title={() => <span style={{ fontSize: "bold" }}>Đơn hàng thành công</span>} pagination={false} />
                    </Col>
                    {/* // thông số bán hàng(dùng chart) */}
                    <Col lg={{ span: 11 }}
                    // style={{ minHeight: 400 }}
                    >
                        <TableCustom columns={secondColumns} dataSource={dataRevenues} title={() => <span style={{ fontSize: "bold" }}>Doanh thu</span>} pagination={false} scroll={{ y: 210 }} />
                    </Col>
                    {/* // thông số khách hàng(email, số tiền chi trả) (dùng table) */}

                    {/* //khác hàng gần đây (dùng table) */}
                </Row>
            </Layout.Content>
        </Layout>
    );
}

export default SaleDashboard;