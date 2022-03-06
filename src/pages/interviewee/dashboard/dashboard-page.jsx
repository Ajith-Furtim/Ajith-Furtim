import React from 'react';
import { useHistory } from 'react-router-dom';

import './dashboard-page.scss';
import 'antd/dist/antd.css';
import { Row, Col, Button, Input, Space, Card, Select, Rate, Avatar, Image } from 'antd';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { ArrowRightOutlined, AudioOutlined } from '@ant-design/icons';

import userImg from '../../../../src/assets/imges/user.png';
const Dashboard = () => {
    const { Search } = Input;
    const { Meta } = Card;
    const { Option } = Select;
    return (
        <div className="dashboard_page_container p_10">
            <div className='dashboard-container'>
                <div className='dasboard-search'>
                    <Row>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                            <Search placeholder="SEARCH SKILL" style={{ width: 250 }} />
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                            <Search placeholder="SEARCH COMPANY" style={{ width: 250 }} />
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                            <Search placeholder="SEARCH EXPERIENCE" style={{ width: 250 }} />
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                            <Search placeholder="SEARCH RATING" style={{ width: 250 }} />
                        </Col>
                    </Row>
                </div>
                <div className='dasboard-head'>
                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <h2>Schedule your discussions with skilled consultants</h2>
                        </Col>
                    </Row>
                    <div className='dashboard-card'>
                        <Row>
                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <Card hoverable style={{ width: 350, marginTop: 16, height: 350 }}>
                                    <div class='card-header'>
                                        <Row>
                                            <Col xs={24} sm={24} md={15} lg={15} xl={15}>
                                                <div>
                                                    <h2>Vignesh</h2>
                                                    <h3>Paypal</h3>
                                                    <h4>Full Stack Developer</h4>
                                                    <h5>Completed 300+ Interviews</h5>
                                                </div>
                                            </Col>
                                            <Col xs={24} sm={24} md={9} lg={9} xl={9}>
                                                <Avatar src={userImg} />
                                                <i><Rate disabled defaultValue={4} /></i>
                                            </Col>
                                        </Row>
                                    </div>
                                    <Meta
                                        description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
                                    />
                                    <footer>
                                        <div class=''>
                                            <Row >
                                                <Col xs={12} sm={12} md={12} lg={12} xl={12} push={12}>
                                                    <div ><button id='resend' >SCHEDULE   <i><ArrowRightOutlined /></i></button></div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </footer>
                                </Card>
                            </Col>
                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <Card hoverable style={{ width: 350, marginTop: 16, height: 350 }}>
                                    <div class='card-header'>
                                        <Row>
                                            <Col xs={24} sm={24} md={15} lg={15} xl={15}>
                                                <div>
                                                    <h2>Vignesh</h2>
                                                    <h3>Paypal</h3>
                                                    <h4>Full Stack Developer</h4>
                                                    <h4>Completed 300+ Interviews</h4>
                                                </div>
                                            </Col>
                                            <Col xs={24} sm={24} md={9} lg={9} xl={9}>
                                                <Avatar src={userImg} />
                                                <i><Rate disabled defaultValue={4} /></i>
                                            </Col>
                                        </Row>
                                    </div>
                                    <Meta
                                        description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
                                    />
                                    <footer>
                                        <div class=''>
                                            <Row >
                                                <Col xs={12} sm={12} md={12} lg={12} xl={12} push={12}>
                                                    <div ><button id='resend'>SCHEDULE   <i><ArrowRightOutlined /></i></button></div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </footer>
                                </Card>
                            </Col>
                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <Card hoverable style={{ width: 350, marginTop: 16, height: 350 }}>
                                    <div class='card-header'>
                                        <Row>
                                            <Col xs={24} sm={24} md={15} lg={15} xl={15}>
                                                <div>
                                                    <h2>Vignesh</h2>
                                                    <h3>Paypal</h3>
                                                    <h4>Full Stack Developer</h4>
                                                    <h4>Completed 300+ Interviews</h4>
                                                </div>
                                            </Col>
                                            <Col xs={24} sm={24} md={9} lg={9} xl={9}>
                                                <Avatar src={userImg} />
                                                <i><Rate disabled defaultValue={5} /></i>
                                            </Col>
                                        </Row>
                                    </div>
                                    <Meta
                                        description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
                                    />
                                    <footer>
                                        <div class=''>
                                            <Row >
                                                <Col xs={12} sm={12} md={12} lg={12} xl={12} push={12}>
                                                    <div ><button id='resend' >SCHEDULE   <i><ArrowRightOutlined /></i></button></div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </footer>
                                </Card>
                            </Col>
                        </Row>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default Dashboard;
