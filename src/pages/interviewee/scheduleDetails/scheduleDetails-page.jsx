import React from 'react';
import { useHistory } from 'react-router-dom';


import './scheduleDetails-page.scss';
import 'antd/dist/antd.css';
import { Row, Col, Button, Input, Space, Card, Select, Rate, Avatar, Image } from 'antd';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { ArrowRightOutlined, AudioOutlined } from '@ant-design/icons';
import userImg from '../../../../src/assets/imges/user.png';

const ScheduleDetails = () => {
    const { Search } = Input;
    const { Meta } = Card;
    const { Option } = Select;
    return (
        <div className="scheduleDetails_container p_10">
            <div className='scheduleDetails-container'>
                <div className='scheduleDetails-header'>
                    <Row>
                        <Col xs={18} sm={18} md={3} lg={3} xl={3}>
                            <img className='user-img' src={userImg} />
                        </Col>
                        <Col xs={6} sm={6} md={5} lg={5} xl={5}>
                            <div className='user-details'>
                                <h2>Vignesh</h2>
                                <i><Rate disabled defaultValue={5} /></i>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={24} sm={24} md={18} lg={18} xl={18}>
                            <div className='user-info'>
                                <h3>I work for Paypal India for about 8 years as Front End Developer & an Engineer. Right now, I'm building on an idea of my own. My current interests are in Product Design & Machine Learning.</h3>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={24} sm={24} md={16} lg={16} xl={16}>
                            <div className='user-skill'>
                                <Row>
                                    <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                                        <div className='user-skill-details'>
                                            <h5>Level</h5>
                                            <h3>Skilled/ Professional</h3>
                                        </div>
                                    </Col>
                                    <Col xs={24} sm={24} md={4} lg={4} xl={4}>
                                        <h5>Experience</h5>
                                        <h3>10+ Years</h3>
                                    </Col>
                                    <Col xs={24} sm={24} md={7} lg={7} xl={7}>
                                        <h5>Skills</h5>
                                        <h3>Full Stack Development</h3>
                                    </Col>
                                    <Col xs={24} sm={24} md={5} lg={5} xl={5}>
                                        <h5>Interviews</h5>
                                        <h3>230+ Profiles</h3>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={24} sm={24} md={18} lg={18} xl={18}>
                            <div className='realated-info'>
                                <h3>Testimonials</h3>
                                <h1>Words from satisfied users</h1>
                            </div>
                            <div className='realated-users'>
                                <Row>
                                    <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                                        <Card hoverable style={{ width: 270, marginTop: 16, height: 290 }}>
                                            <div class='card-header'>
                                                <Row>
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24} className='star-rate'>
                                                        <i><Rate disabled defaultValue={4} /></i>
                                                    </Col>
                                                </Row>
                                            </div>
                                            <Meta
                                                description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
                                            />
                                            <footer className='card-footer'>
                                                <div class='card-header'>
                                                    <Row>
                                                        <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                                                            <Avatar src={userImg} />
                                                        </Col>
                                                        <Col xs={18} sm={18} md={18} lg={18} xl={18} push={2}>
                                                            <div>
                                                                <h4>Vignesh</h4>
                                                                <h5>Developer</h5>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </footer>
                                        </Card>
                                    </Col>
                                    <Col xs={24} sm={24} md={6} lg={6} xl={6} push={2}>
                                        <Card hoverable style={{ width: 270, marginTop: 16, height: 290 }}>
                                            <div class='card-header'>
                                                <Row>
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                        <i><Rate disabled defaultValue={4} /></i>
                                                    </Col>
                                                </Row>
                                            </div>
                                            <Meta
                                                description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
                                            />
                                            <footer className='card-footer'>
                                                <div class='card-header'>
                                                    <Row>
                                                        <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                                                            <Avatar src={userImg} />
                                                        </Col>
                                                        <Col xs={18} sm={18} md={18} lg={18} xl={18} push={2}>
                                                            <div>
                                                                <h4>Vignesh</h4>
                                                                <h5>Developer</h5>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </footer>
                                        </Card>
                                    </Col>
                                    <Col xs={24} sm={24} md={6} lg={6} xl={6} push={4}>
                                        <Card hoverable style={{ width: 270, marginTop: 16, height: 290 }}>
                                            <div class='card-header'>
                                                <Row>
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                        <i><Rate disabled defaultValue={4} /></i>
                                                    </Col>
                                                </Row>
                                            </div>
                                            <Meta
                                                description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
                                            />
                                            <footer className='card-footer'>
                                                <div class='card-header'>
                                                    <Row>
                                                        <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                                                            <Avatar src={userImg} />
                                                        </Col>
                                                        <Col xs={18} sm={18} md={18} lg={18} xl={18} push={2}>
                                                            <div>
                                                                <h4>Vignesh</h4>
                                                                <h5>Developer</h5>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </footer>
                                        </Card>
                                    </Col>
                                </Row>

                            </div>
                        </Col>
                    </Row>
                </div>

            </div>
        </div>
    );
};

export default ScheduleDetails;
