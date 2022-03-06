import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';


import './rescheduleInterview-page.scss';
import 'antd/dist/antd.css';
import { Row, Col, Button, Input, Space, Card, Select, Rate, Avatar, Image, Steps, DatePicker, Form, Modal } from 'antd';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { ArrowRightOutlined, AudioOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

import fullstack from '../../../../src/assets/imges/c-full-stack.svg';
import moment from 'moment';

import apiService from "../../../utils/apiService";
import Notification from "../../../components/notification/notification";

const ReScheduledInterview = () => {
    const history = useHistory();
    const [form] = Form.useForm();
    let data = useLocation();
    let interviewData = data.state.data;
    console.log(data)

    const { confirm } = Modal;
    const { Search } = Input;
    const { Meta } = Card;
    const { Option } = Select;
    const { Step } = Steps;
    const jwt = localStorage.getItem('jwt');
    const [reason, setReason] = useState("");
    const [suggestion, setSuggestion] = useState([]);

    const onChange = (date, dateString) => {
        console.log(date, dateString);
    }


    function showConfirm() {
        confirm({
            title: 'Do you want to cancel?',
            icon: <ExclamationCircleOutlined />,
            onOk() {
                submit();
            },
            onCancel() {
            },
        });
    }

    const submit = () => {
        console.log(interviewData.id)
        history.push({ pathname: '/interviewerprofile', state: { data: interviewData, reason: reason, reschedule: "Y" } });
        // apiService(`schedule/cancel`, 'put', {
        //     id: interviewData.id, "reason": reason,
        //     "suggestion": suggestion
        // }, false, jwt,
        //     result => {
        //         if (result.data.message) {
        //             Notification.openNotificationSuccess(result.data.message)
        //             history.push({ pathname: '/interviews' });

        //         } else {
        //             Notification.openNotificationFaliure(result.data.message)
        //         }
        //     },
        //     (error) => {

        //     });
    }


    const handleSubmit = () => {
        showConfirm();
    };

    return (
        <div className="rescheduledInterview_page_container p_10">
            <div className='scheduledInterview-container'>
                <div className='scheduledInterview-title'>
                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <h2>Reschedule Interview</h2>
                        </Col>
                    </Row>
                </div>
                <div className='scheduledInterview-status'>
                    <Row>
                        <Col xs={24} sm={24} md={3} lg={3} xl={3}>
                            <img alt="example" src={fullstack} />
                        </Col>
                        <Col xs={24} sm={24} md={3} lg={3} xl={3}>
                            <div className="assigned-details">
                                <h4>{interviewData.companyname}</h4>
                                <h3>{interviewData.companyname} | {moment(interviewData.date).format('DD MMM')} {interviewData.time}</h3>
                                <h5>Interviewer Mr.{interviewData.name} has been assigned</h5>
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={14} lg={14} xl={14}>
                            <div className='stpes-completed-large'>
                                <Steps size="small" current={1}>
                                    <Step description="INTERVIEWER ASSIGNED" />
                                    <Step description="PAYMENT COMPLETED" />
                                    <Step description="SYSTEM CHECK" />
                                    <Step description="PREP TEST" />
                                    <Step description="BEGIN INTERVIEW" />
                                </Steps>
                                {/* <Steps progressDot current={3}>
                                <Step description="INTERVIEWER ASSIGNED" />
                                <Step description="PAYMENT COMPLETED" />
                                <Step description="SYSTEM CHECK" />
                                <Step description="PREP TEST" />
                                <Step description="BEGIN INTERVIEW" />
                            </Steps> */}
                            </div>
                            <div className='stpes-completed-small'>
                                <Steps size="small" direction="vertical" size="small" current={1}>
                                    <Step description="INTERVIEWER ASSIGNED" />
                                    <Step description="PAYMENT COMPLETED" />
                                    <Step description="SYSTEM CHECK" />
                                    <Step description="PREP TEST" />
                                    <Step description="BEGIN INTERVIEW" />
                                </Steps>
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={3} lg={3} xl={3}>
                            <div className='btn-div'>
                                <Row>
                                    {/* <Col xs={12} sm={12} md={24} lg={24} xl={24}>
                                        <div ><button id='resend' >RE SCHEDULE   <i><ArrowRightOutlined /></i></button></div>
                                    </Col> */}
                                    <Col xs={12} sm={12} md={24} lg={24} xl={24}>
                                        {/* <div > <Link to={{ pathname: "/cancelinterview", }}>
                                            <button id='cancel' >cancel  <i><ArrowRightOutlined /></i>
                                            </button></Link>
                                        </div> */}

                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className='reschedule-bottom'>
                    <Form name="cancel" form={form} onFinish={handleSubmit} layout="vertical">
                        <Row>
                            <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                                <label for=''>Reschedule Reason</label>
                                <Form.Item
                                    name="reason"
                                    rules={[{ message: 'Please select your reason!', required: true }]}>
                                    <Select
                                        showSearch
                                        style={{ width: '100%' }}
                                        value={reason} onChange={e => setReason(e)}
                                        placeholder="List Of Reasons"
                                        optionFilterProp="children"
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                        filterSort={(optionA, optionB) =>
                                            optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                        }
                                    >
                                        <Option value="Can't join, personal issues">Can't join, personal issues</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={6} lg={6} xl={6} push={1}>
                                <label for=''>Reschedule Date</label>
                                <DatePicker onChange={onChange} />
                            </Col>
                            <Col xs={24} sm={24} md={6} lg={6} xl={6} push={2}>
                                <label for=''>Skill to be interviewd?</label>
                                <Select
                                    showSearch
                                    style={{ width: '100% ' }}
                                    placeholder="Select Skill"
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                    filterSort={(optionA, optionB) =>
                                        optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                    }
                                >
                                    <Option value="1">CSE</Option>
                                    <Option value="2">ECE</Option>
                                    <Option value="3">IT</Option>
                                    <Option value="4">EEE</Option>
                                    <Option value="5">CS</Option>
                                </Select>
                            </Col>
                            <Col xs={24} sm={24} md={3} lg={3} xl={3} push={2}>
                                <div className='btn-div reschedule-btn'>
                                    <Row>
                                        <Col xs={12} sm={12} md={24} lg={24} xl={24}>

                                            <button id='resend' >RE SCHEDULE   <i><ArrowRightOutlined /></i></button>

                                        </Col>

                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </div>
        </div>
    );

};

export default ReScheduledInterview;
