import React, { useEffect, useState } from 'react'
import { Card, Col, Layout, PageHeader, Row, Statistic } from 'antd'
import TableCustom from 'components/CustomTable'
import { getDashboardMarketing } from './dashboard.service';
import { firstColumns, firstData, secondColumns, secondData, labels, thridColumns, thridData } from './constants';
import faker from 'faker';
import './style.less'
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


function AdminDashboard() {
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
            >
                <div className="site-statistic-demo-card">
                    <Row gutter={16} >
                        <Col span={8}>
                            <Card>
                                <Statistic
                                    title="Đợi xác nhân"
                                    value={11.28}
                                    valueStyle={{
                                        color: '#ffc300',
                                    }}
                                />
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card>
                                <Statistic
                                    title="Hoàn thành"
                                    value={9}
                                    valueStyle={{
                                        color: '#3f8600',
                                    }}
                                />
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card>
                                <Statistic
                                    title="Hủy"
                                    value={9}
                                    valueStyle={{
                                        color: '#cf1322',
                                    }}
                                />
                            </Card>
                        </Col>
                    </Row>
                </div>
            </PageHeader>
            <Layout.Content>
                <Row style={{ marginBottom: '10px' }} >
                    <Col lg={{ span: 11 }} offset={1}>
                        <TableCustom columns={thridColumns} dataSource={thridData} scroll={{ y: 320 }} title={() => <span style={{ fontSize: "bold" }}>Tổng đơn hàng</span>} pagination={false} />
                    </Col>
                    <Col lg={{ span: 11 }}
                        style={{ marginLeft: '15px' }}
                    >
                        <TableCustom columns={secondColumns} dataSource={secondData} title={() => <span style={{ fontSize: "bold" }}>Doanh thu</span>} pagination={false} scroll={{ y: 210 }} />
                    </Col>
                </Row>
                <Row style={{ height: 400, marginBottom: 20, marginTop: 40 }}>
                    {/* // top 5 post gần đây (dùng table) */}
                    <Col lg={{ span: 11 }} style={{ marginLeft: '55px', marginRight: '20px' }} >
                        <TableCustom columns={firstColumns} dataSource={firstData} scroll={{ y: 320 }} title={() => <span style={{ fontSize: "bold" }}>Đơn hàng thành công</span>} pagination={false} />
                    </Col>
                    {/* // thông số bán hàng(dùng chart) */}
                    <Col lg={{ span: 11 }}
                    // style={{ minHeight: 400 }}
                    >
                        <TableCustom columns={secondColumns} dataSource={secondData} title={() => <span style={{ fontSize: "bold" }}>Doanh thu</span>} pagination={false} scroll={{ y: 210 }} />
                    </Col>
                    {/* // thông số khách hàng(email, số tiền chi trả) (dùng table) */}

                    {/* //khác hàng gần đây (dùng table) */}
                </Row>
            </Layout.Content>
        </Layout>
    );
}

export default AdminDashboard;