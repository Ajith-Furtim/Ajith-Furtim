import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Card, Select, DatePicker, Spin } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';


import './yourself-page.scss';
import 'antd/dist/antd.css';
import { Form, Input, Radio } from 'antd';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { ArrowRightOutlined, UserOutlined, DesktopOutlined, CheckCircleTwoTone } from '@ant-design/icons';


import otpImg from '../../../../src/assets/imges/yourselfnew.png';
import apiService from "../../../utils/apiService";
import Notification from "../../../components/notification/notification";
const menus = [
    {
        icon: <ArrowRightOutlined />,
    }
];
const { Meta } = Card;
const { Option } = Select;

const config = {
    rules: [{ type: 'object', required: true, message: 'Please select your graduation Year!' }],

};

const YourSelf = () => {
    const history = useHistory();
    const jwt = localStorage.getItem('jwt');
    const [form] = Form.useForm();
    const [detailsForm, setDetailsForm] = useState(false);
    const [formShowStudent, setFormShowStudent] = useState(false);
    const [selectItemId, setSelectItemId] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [cgpa, setcgpa] = useState("");
    const [graduation, setgraduation] = useState([]);
    const [Specialization, setspecialization] = useState([]);
    const [year, setyear] = useState([]);
    const [experience, setexperience] = useState([]);
    const [college, setcollege] = useState("");
    const [organization, setorganization] = useState("");
    const [isStudent, setIsStudent] = useState("");

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(true);
        }, 100);
    }, []);


    const handleSubmit = () => {
        const yourself = {
            isStudent: isStudent, degree: graduation, specialization: Specialization, graduationYear: year,
            collegeInfoDto: {
                cgpa: cgpa, collegeName: college,
            },
            professionalInfoDto: {
                experience: experience, companyName: organization,
            }
        }
        Notification.openNotificationSuccess("Details updated!")
        history.push({ pathname: '/programminglanguages', state: { yourself: yourself } });


        // apiService(`onboarding/userdetails`, 'post', {
        //     isStudent: isStudent, degree: graduation, specialization: Specialization, graduationYear: year,
        //     collegeInfoDto: {
        //         cgpa: cgpa, collegeName: college,
        //     },
        //     professionalInfoDto: {
        //         experience: experience, companyName: organization,
        //     }
        // }, false, jwt,
        //     result => {
        //         if (result.data.message) {
        //             Notification.openNotificationSuccess("Details updated!")
        //             history.push('/programminglanguages');

        //         } else {
        //             Notification.openNotificationSuccess("Details updated!")
        //             history.push('/programminglanguages');
        //         }
        //     },
        //     (error) => {

        //     });
    };

    const handleClick1 = (value) => {
        setSelectItemId("1");
        setDetailsForm(true);
        setFormShowStudent(false);
        setIsStudent("Y")
        // this.setState({ detailsForm: value, formShowStudent: index });

    }
    const handleClick2 = (value) => {
        setSelectItemId("2");
        setDetailsForm(true);
        setFormShowStudent(true);
        setIsStudent("N")
    }
    const handleClickNext = (value) => {
        Notification.openNotificationFaliure("Pick one of these that describes yourself now!")
    }
    const handleClickBack = (value) => {
        setDetailsForm(false);

    }
    const onChange = (date, dateString) => {
        console.log(dateString);
        setyear(dateString)
    }
    return (
        <div className="yourself_page_container">
            {isLoading == false ?
                <div className="spinner">
                    <Spin />
                </div> :
                <div class='yourself-container'>

                    {detailsForm == false ?
                        <div class='left-container'>
                            <header>
                                <div class="header-name">
                                    <Row>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                            <h2>Tell us about yourself </h2>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                            <h4>Pick one of these that describes yourself now </h4>
                                        </Col>
                                    </Row>
                                </div>

                                <div class='card'>
                                    <Card className={"1" == selectItemId ? 'ant-card-select' : ''} onClick={() => handleClick1(1)} style={{ width: 210, marginTop: 16, height: 115 }}>
                                        <Row>
                                            <Col xs={24} sm={24} md={24} lg={24} xl={24} push={13}>
                                                {"1" == selectItemId ?
                                                    <i > <CheckCircleTwoTone twoToneColor="#52c41a" /></i>
                                                    : null}
                                            </Col>
                                        </Row>
                                        <div class='card-header'>
                                            <div>
                                                <i> <UserOutlined /></i>
                                            </div>
                                        </div>
                                        <Meta
                                            description="Student / Fresher out of collage"
                                        />
                                    </Card>
                                    <Card className={"2" == selectItemId ? 'ant-card-select' : ''} onClick={() => handleClick2(false)} style={{ width: 210, marginTop: 16, height: 115, marginLeft: 50 }}>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24} push={13}>
                                            {"2" == selectItemId ?
                                                <i > <CheckCircleTwoTone twoToneColor="#52c41a" /></i>
                                                : null}
                                        </Col>
                                        <div class='card-header'>
                                            <div>
                                                <i> <DesktopOutlined /></i>
                                            </div>
                                        </div>
                                        <Meta
                                            description="Software Professional"
                                        />
                                    </Card>

                                </div>
                                <footer>
                                    <div class='login-footer'>
                                        <Button onClick={handleClickNext} type="primary" icon={<ArrowRightOutlined />} size="large">NEXT STEP </Button>
                                    </div>
                                </footer>
                            </header>
                        </div>
                        :
                        <div class='left-container'>
                            <Form name="yourself" form={form} onFinish={handleSubmit} layout="vertical">
                                <header>
                                    <div class="header-name">
                                        <Row>
                                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                                <h1>Details</h1>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div class='form'>
                                        <Form.Item
                                            name="graduation"
                                            rules={[{ message: 'Please select your Specialization!', required: true }]}>
                                            <Select
                                                showSearch
                                                style={{ width: '100%' }}
                                                placeholder="Select Graduation Degree"
                                                value={graduation} onChange={e => setgraduation(e)}
                                                optionFilterProp="children"
                                                filterOption={(input, option) =>
                                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                }
                                                filterSort={(optionA, optionB) =>
                                                    optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                                }
                                            >
                                                <Option value="BE">BE</Option>
                                                <Option value="BTECH">BTECH</Option>
                                                <Option value="BCA">BCA</Option>
                                                <Option value="BSC">BSC</Option>
                                                <Option value="MCA">MCA</Option>
                                            </Select>
                                        </Form.Item>
                                        <Form.Item
                                            name="specialization"

                                            rules={[{ message: 'Please select your specialization!', required: true }]}>
                                            <Select
                                                showSearch
                                                style={{ width: '100% ' }}
                                                placeholder="Select Specialization"
                                                optionFilterProp="children"
                                                filterOption={(input, option) =>
                                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                }
                                                filterSort={(optionA, optionB) =>
                                                    optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                                }
                                                value={Specialization} onChange={e => setspecialization(e)}
                                            >
                                                <Option value="CSE">CSE</Option>
                                                <Option value="ECE">ECE</Option>
                                                <Option value="IT">IT</Option>
                                                <Option value="EEE">EEE</Option>
                                                <Option value="CS">CS</Option>
                                            </Select>
                                        </Form.Item>
                                    </div>
                                    <div class='form'>

                                        <Form.Item name="year" {...config} style={{ display: 'inline-block', width: 'calc(50%)' }}
                                        >
                                            <DatePicker value={year} onChange={onChange} picker="year" />
                                        </Form.Item>
                                        {formShowStudent == false ?
                                            <Form.Item style={{ display: 'inline-block', width: 'calc(50%)', paddingLeft: 8, marginBottom: 0 }}>
                                                <Form.Item
                                                    name="cgpa"
                                                    rules={[{ message: 'Please enter your CGPA!', required: true }]}>
                                                    <input placeholder="CGPA / Percentage" type='text' id='cgpa'
                                                        value={cgpa} onChange={e => setcgpa(e.target.value)} />

                                                </Form.Item>
                                            </Form.Item> :
                                            <Form.Item style={{ display: 'inline-block', width: 'calc(50%)', paddingLeft: 8, marginBottom: 0 }}>
                                                <Form.Item
                                                    name="experience"
                                                    rules={[{ message: 'Please select your IT Experience!', required: true }]}>
                                                    <Select
                                                        showSearch
                                                        style={{ width: '100%' }}
                                                        placeholder="Select Your IT experience"
                                                        optionFilterProp="children"
                                                        filterOption={(input, option) =>
                                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                        }
                                                        filterSort={(optionA, optionB) =>
                                                            optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                                        }
                                                        value={experience} onChange={e => setexperience(e)}
                                                    >
                                                        <Option value="1">1</Option>
                                                        <Option value="2">2</Option>
                                                        <Option value="3">3</Option>
                                                        <Option value="4">4</Option>
                                                        <Option value="5">5</Option>
                                                    </Select>
                                                </Form.Item>
                                            </Form.Item>
                                        }


                                    </div>
                                    <div class='form card-input'>

                                        {formShowStudent == false ?
                                            <div>
                                                <Form.Item
                                                    name="college"
                                                    rules={[{ message: 'Please enter your College!', required: true }]}>
                                                    <input id='' placeholder="Your College" type='text'
                                                        value={college} onChange={e => setcollege(e.target.value)} />
                                                </Form.Item>
                                            </div> :
                                            <div>
                                                <Form.Item
                                                    name="organization"
                                                    rules={[{ message: 'Please enter your organization!', required: true }]}>
                                                    <input placeholder="Your Present Organization" type='text'
                                                        value={organization} onChange={e => setorganization(e.target.value)} />
                                                </Form.Item>
                                            </div>
                                        }

                                    </div>
                                    <footer>
                                        <div class='footer_details'>
                                            {/* <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                                <button onClick={() => handleClickBack(false)} id='resend'>BACK   <i><ArrowRightOutlined /></i></button>
                                            </Col> */}
                                            <Button onClick={() => handleClickBack(false)} type="back" icon={<ArrowRightOutlined />} size="large">BACK </Button>
                                            <Button htmlType="submit" type="primary" icon={<ArrowRightOutlined />} size="large">NEXT STEP </Button>
                                            {/* <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                                <button id='next'>NEXT STEP   <i><ArrowRightOutlined /></i></button>
                                            </Col> */}
                                        </div>
                                    </footer>
                                </header>

                            </Form>
                        </div>}
                    <div class='right-container'>
                        <h1>Our platform helps you boost your confidence</h1>
                        <img src={otpImg} />
                    </div>

                </div>
            }

        </div>
    );
}

export default YourSelf;