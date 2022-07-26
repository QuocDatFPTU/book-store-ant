import React, { useEffect, useState } from 'react'
import { Card, Col, Layout, PageHeader, Row } from 'antd'
import TableCustom from 'components/CustomTable'
import { getDashboardMarketing } from './dashboard.service';
import { firstColumns, firstData, secondColumns, secondData, labels } from './constants';
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


function MarketingDashboard() {
    const [params, setParams] = useState();
    const [loading, setLoading] = useState(false);
    const [dataMarketing, setDataMarketing] = useState();
    const [data, setData] = useState([]);

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
                console.log(result);
                setData([...result]);
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
                    <Col offset={4}>
                        <Card>
                            <Line options={options} data={dataChart} height="400px" width="1000px" />
                        </Card>
                    </Col>
                </Row>
                <Row style={{ height: 400, marginBottom: 40 }}>
                    {/* // top 5 post gần đây (dùng table) */}
                    <Col lg={{ span: 11 }} style={{ marginLeft: '10px', marginRight: '20px' }}>
                        <TableCustom columns={firstColumns} dataSource={firstData} scroll={{ y: 320 }} title={() => <span style={{ fontSize: "bold" }}>Top 5 post gần đây</span>} pagination={false} />
                    </Col>
                    {/* // thông số bán hàng(dùng chart) */}
                    <Col lg={{ span: 11 }}
                    // style={{ minHeight: 400 }}
                    >
                        <TableCustom columns={secondColumns} dataSource={secondData} size="middle " title={() => <span style={{ fontSize: "bold" }}>Thông số khách hàng</span>} pagination={false} />
                    </Col>
                    {/* // thông số khách hàng(email, số tiền chi trả) (dùng table) */}

                    {/* //khác hàng gần đây (dùng table) */}
                </Row>
            </Layout.Content>
        </Layout>
    );
}

export default MarketingDashboard;