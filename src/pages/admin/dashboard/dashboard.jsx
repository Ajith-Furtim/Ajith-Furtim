import React from 'react';
import { Card, Col, Input, Row } from 'antd';
import { Space } from 'antd';
import './dashboard.scss';
import { DollarCircleTwoTone, HeartTwoTone, BellOutlined, SettingOutlined } from '@ant-design/icons';
import { UsergroupDeleteOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Table, } from 'antd';
import { Progress } from 'antd';
import { Divider, } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Upload, message, Button } from 'antd';
import { Avatar, } from 'antd';
import { UserOutlined, AntDesignOutlined } from '@ant-design/icons';
import { Timeline } from 'antd';
import { Radio } from 'antd';
// import { PieChart } from 'react-minimal-pie-chart';
// import { MDBContainer } from "mdbreact";
// import { Bar } from "react-chartjs-2";
// import { Line } from "react-chartjs-2";
// import { Chart as ChartJS } from 'chart.js/auto' //important
// import { Chart } from 'react-chartjs-2'//important
class Dashboard extends React.Component {
    state = {
        reverse: false,
    };

    handleClick = () => {
        this.setState({ reverse: !this.state.reverse });
    };

    state = {
        size: 'large',
    };
    handleSizeChange = e => {
        this.setState({ size: e.target.value });
    };
    state = {
        dataLine: {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [
                {
                    label: "My First dataset",
                    fill: true,
                    lineTension: 0.3,
                    backgroundColor: "rgba(225, 204,230, .3)",
                    borderColor: "#39ff14",
                    borderCapStyle: "butt",
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: "miter",
                    pointBorderColor: "rgb(205, 130,1 58)",
                    pointBackgroundColor: "rgb(255, 255, 255)",
                    pointBorderWidth: 10,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgb(0, 0, 0)",
                    pointHoverBorderColor: "rgba(220, 220, 220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [65, 59, 80, 81, 56, 55, 40]
                },
                {
                    label: "My Second dataset",
                    fill: true,
                    lineTension: 0.3,
                    backgroundColor: "rgba(184, 185, 210, .3)",
                    borderColor: "#55ceff",
                    borderCapStyle: "butt",
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: "miter",
                    pointBorderColor: "rgb(35, 26, 136)",
                    pointBackgroundColor: "rgb(255, 255, 255)",
                    pointBorderWidth: 10,
                    pointHoverRadius: 1,
                    pointHoverBackgroundColor: "rgb(0, 0, 0)",
                    pointHoverBorderColor: "rgba(220, 220, 220, 1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [28, 48, 40, 19, 86, 27, 90]
                }
            ]
        }
    };
    statee = {
        dataBar: {
            labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange", "Black"],
            datasets: [
                {
                    label: "% of Votes",
                    data: [12, 19, 13, 15, 12, 13, 18,],
                    backgroundColor: [
                        "rgba(255, 134,159,0.4)",
                        "rgba(98,  182, 239,0.4)",
                        "rgba(255, 218, 128,0.4)",
                        "rgba(113, 205, 205,0.4)",
                        "rgba(170, 128, 252,0.4)",
                        "rgba(255, 177, 101,0.4)",
                        "rgba(0, 0, 0,0.4)",

                    ],
                    borderWidth: 2,
                    borderColor: [
                        "rgba(255, 134, 159, 1)",
                        "rgba(98,  182, 239, 1)",
                        "rgba(255, 218, 128, 1)",
                        "rgba(113, 205, 205, 1)",
                        "rgba(170, 128, 252, 1)",
                        "rgba(255, 177, 101, 1)",
                        "rgba(0, 0, 0,0.4)",


                    ]
                }
            ]
        },
        barChartOptions: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                xAxes: [
                    {
                        barPercentage: 1,
                        gridLines: {
                            display: true,
                            color: "rgba(0, 0, 0, 0.1)"
                        }
                    }
                ],
                yAxes: [
                    {
                        gridLines: {
                            display: false,
                            color: "rgba(0, 0, 0, 0.1)"
                        },
                        ticks: {
                            beginAtZero: true
                        }
                    }
                ]
            }
        }
    }
    render() {
        const { Search } = Input;


        const { size } = this.state;
        const dataSource = [
            {
                key: '1',
                COMPANIES: ' Soft UI Shopify Version',
                MEMBERS: <Avatar.Group>
                    <Avatar src="https://joeschmoe.io/api/v1/random" />
                    <Avatar
                        style={{
                            backgroundColor: '#f56a00',
                        }}
                    >
                        A
                    </Avatar>
                    <Tooltip title="Ant User" placement="top">
                        <Avatar
                            style={{
                                backgroundColor: '#87d068',
                            }}
                            icon={<UserOutlined />}
                        />
                    </Tooltip>
                    <Avatar
                        style={{
                            backgroundColor: '#1890ff',
                        }}
                        icon={<AntDesignOutlined />}
                    />
                </Avatar.Group>,
                BUDGET: "$14,000",
                COMPLETION: <Progress percent={30} size="small" status="active" />
                ,

            },
            {
                key: '2',
                COMPANIES: 'Progress Track',
                MEMBERS: <Avatar.Group>
                    <Avatar src="https://joeschmoe.io/api/v1/random" />
                    <Avatar
                        style={{
                            backgroundColor: '#f56a00',
                        }}
                    >
                        B
                    </Avatar>
                    <Tooltip title="Ant User" placement="top">
                        <Avatar
                            style={{
                                backgroundColor: '#87d068',
                            }}
                            icon={<UserOutlined />}
                        />
                    </Tooltip>
                    <Avatar
                        style={{
                            backgroundColor: '#1890ff',
                        }}
                        icon={<AntDesignOutlined />}
                    />
                </Avatar.Group>,
                BUDGET: "$21,000",
                COMPLETION: <Progress percent={50} size="small" status="active" />,

            },
            {
                key: '3',
                COMPANIES: 'Fix Platform Errors',
                MEMBERS: <Avatar.Group>
                    <Avatar src="https://joeschmoe.io/api/v1/random" />
                    <Avatar
                        style={{
                            backgroundColor: '#f56a00',
                        }}
                    >
                        C
                    </Avatar>
                    <Tooltip title="Ant User" placement="top">
                        <Avatar
                            style={{
                                backgroundColor: '#87d068',
                            }}
                            icon={<UserOutlined />}
                        />
                    </Tooltip>
                    <Avatar
                        style={{
                            backgroundColor: '#1890ff',
                        }}
                        icon={<AntDesignOutlined />}
                    />
                </Avatar.Group>,
                BUDGET: "$41,000",
                COMPLETION: <Progress percent={70} size="small" status="exception" />,

            },
            {
                key: '4',
                COMPANIES: 'Launch new Mobile App',
                MEMBERS: <Avatar.Group>
                    <Avatar src="https://joeschmoe.io/api/v1/random" />
                    <Avatar
                        style={{
                            backgroundColor: '#f56a00',
                        }}
                    >
                        D
                    </Avatar>
                    <Tooltip title="Ant User" placement="top">
                        <Avatar
                            style={{
                                backgroundColor: '#87d068',
                            }}
                            icon={<UserOutlined />}
                        />
                    </Tooltip>
                    <Avatar
                        style={{
                            backgroundColor: '#1890ff',
                        }}
                        icon={<AntDesignOutlined />}
                    />
                </Avatar.Group>,
                BUDGET: "$50,000",
                COMPLETION: <Progress percent={100} size="small" />,

            },
            {
                key: '5',
                COMPANIES: 'Add the New Landing Page',
                MEMBERS: <Avatar.Group>
                    <Avatar src="https://joeschmoe.io/api/v1/random" />
                    <Avatar
                        style={{
                            backgroundColor: '#f56a00',
                        }}
                    >
                        E
                    </Avatar>
                    <Tooltip title="Ant User" placement="top">
                        <Avatar
                            style={{
                                backgroundColor: '#87d068',
                            }}
                            icon={<UserOutlined />}
                        />
                    </Tooltip>
                    <Avatar
                        style={{
                            backgroundColor: '#1890ff',
                        }}
                        icon={<AntDesignOutlined />}
                    />
                </Avatar.Group>,
                BUDGET: "NOT SET",
                COMPLETION: <Progress percent={70} size="small" status="active" />,

            },
            {
                key: '6',
                COMPANIES: 'Redesign Online Store',
                MEMBERS: <Avatar.Group>
                    <Avatar src="https://joeschmoe.io/api/v1/random" />
                    <Avatar
                        style={{
                            backgroundColor: '#f56a00',
                        }}
                    >
                        F
                    </Avatar>
                    <Tooltip title="Ant User" placement="top">
                        <Avatar
                            style={{
                                backgroundColor: '#87d068',
                            }}
                            icon={<UserOutlined />}
                        />
                    </Tooltip>
                    <Avatar
                        style={{
                            backgroundColor: '#1890ff',
                        }}
                        icon={<AntDesignOutlined />}
                    />
                </Avatar.Group>,
                BUDGET: "$20,000",
                COMPLETION: <Progress percent={90} size="small" status="active" />,

            },
        ];
        const columns = [
            {
                title: 'COMPANIES',
                dataIndex: 'COMPANIES',
                key: 'COMPANIES',
            },
            {
                title: 'MEMBERS',
                dataIndex: 'MEMBERS',
                key: 'MEMBERS',
            },
            {
                title: 'BUDGET',
                dataIndex: 'BUDGET',
                key: 'BUDGET',
            },
            {
                title: 'COMPLETION',
                dataIndex: 'COMPLETION',
                key: 'COMPLETION',
            },
        ];
        const props = {
            name: 'file',
            action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
            headers: {
                authorization: 'authorization-text',
            },
            onChange(info) {
                if (info.file.status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully`);
                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            },
        };

        return (
            <div>
                <div className='bell'>
                    {/* <BellOutlined /> */}
                </div>


                <div className='align'>
                    <div className='alignment'>
                        <h1><b>DASHBOARD</b></h1>
                    </div>
                    <Row>

                        <div>
                            <Col span={6}>
                                <Card hoverable style={{ width: 350, marginTop: 16, height: 120 }} className='card1'>
                                    <Row>
                                        <Col span={12}>
                                            <h3>Today's Sale</h3>
                                            <h1><b>$30,000</b><h5 className='percentage'>+30%</h5></h1>
                                        </Col>
                                        <Col span={12}>
                                            <Card className='sub-card'>
                                                <div style={{ fontSize: "20px" }} className='icon'>
                                                    <Space>
                                                        <DollarCircleTwoTone />
                                                    </Space>
                                                </div>
                                            </Card>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        </div>
                        <div>
                            <Col span={6}>
                                <Card hoverable style={{ width: 350, marginTop: 16, height: 120 }} className='card1'>
                                    <Row>
                                        <Col span={12}>
                                            <h3>Today's user</h3>
                                            <h1><b>30,000</b><h5 className='percentage'>+30%</h5></h1>
                                        </Col>
                                        <Col span={12}>
                                            <Card className='sub-card'>
                                                <div style={{ fontSize: "20px" }} className='icon'>
                                                    <Space>
                                                        <UsergroupDeleteOutlined />
                                                    </Space>
                                                </div>
                                            </Card>

                                        </Col>
                                    </Row>

                                </Card>
                            </Col>
                        </div>
                        <div>
                            <Col span={6}>
                                <Card hoverable style={{ width: 350, marginTop: 16, height: 120 }} className='card1'>
                                    <Row>
                                        <Col span={12}>
                                            <h3>New client</h3>
                                            <h1><b>+30,000</b><h5 className='percentage'>+30%</h5></h1>
                                        </Col>
                                        <Col span={12}>
                                            <Card className='sub-card'>
                                                <div style={{ fontSize: "20px" }} className='icon'>
                                                    <Space>
                                                        <HeartTwoTone />
                                                    </Space>
                                                </div>
                                            </Card>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        </div>
                        <div>
                            <Col span={6}>
                                <Card hoverable style={{ width: 350, marginTop: 16, height: 120 }} className='card1'>
                                    <Row>
                                        <Col span={12}>
                                            <h3>New order</h3>
                                            <h1><b>$30,000</b><h5 className='percentage'>+30%</h5></h1>
                                        </Col>
                                        <Col span={12}>
                                            <Card className='sub-card'>
                                                <div style={{ fontSize: "20px" }} className='icon'>
                                                    <Space>
                                                        <ShoppingCartOutlined />
                                                    </Space>
                                                </div>
                                            </Card>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        </div>


                    </Row>
                    {/* Card 3 Start*/}

                    {/* <Divider orientation="left"></Divider> */}

                    {/* card 4 end */}

                </div>
            </div>
        )
    }
}

export default Dashboard;

