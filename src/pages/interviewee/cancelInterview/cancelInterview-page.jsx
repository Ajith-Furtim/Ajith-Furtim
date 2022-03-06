import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import './cancelInterview-page.scss';
import 'antd/dist/antd.css';
import { Row, Col, Button, Input, Space, Card, Select, Rate, Avatar, Image, Steps, DatePicker, Modal, Form, Spin } from 'antd';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { ArrowRightOutlined, AudioOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

import fullstack from '../../../../src/assets/imges/c-full-stack.svg';
import moment from 'moment';
import apiService from "../../../utils/apiService";
import Notification from "../../../components/notification/notification";
const CancelInterview = () => {
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
    const [isLoading, setIsLoading] = useState(true);




    useEffect(() => {
        // getInterviewerDetails();
    }, []);

    function showConfirm() {
        confirm({
            title: 'Do you want to cancel?',
            icon: <ExclamationCircleOutlined />,
            onOk() {
                setIsLoading(false);
                submit();
            },
            onCancel() {
            },
        });
    }

    const submit = () => {
        console.log(interviewData.id)
        console.log(reason)
        console.log(suggestion)
        apiService(`schedule/cancel`, 'put', {
            id: interviewData.id, "reason": reason,
            "suggestion": suggestion
        }, false, jwt,
            result => {
                if (result.data.message) {
                    Notification.openNotificationSuccess(result.data.message)
                    history.push({ pathname: '/interviews' });
                    setIsLoading(true);

                } else {
                    setIsLoading(true);
                    Notification.openNotificationFaliure(result.data.message)
                }
            },
            (error) => {

            });
    }


    const handleSubmit = () => {
        showConfirm();
    };


    return (
        <div className="cancelInterview_page_container p_10">
            {isLoading == false ?
                <div className="spinner">
                    <Spin />
                </div> :
                <div className='scheduledInterview-container'>
                    <div className='scheduledInterview-title'>
                        <Row>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <h2>Cancel Interview</h2>
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
                        </Row>
                    </div>
                    <div className='reschedule-bottom'>
                        <Form name="cancel" form={form} onFinish={handleSubmit} layout="vertical">
                            <Row>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                                    <label for=''>Cancel Reason</label>
                                    <Form.Item
                                        name="reason"
                                        rules={[{ message: 'Please select your reason!', required: true }]}>
                                        <Select
                                            showSearch
                                            style={{ width: '100%' }}
                                            placeholder="List Of Reasons"
                                            value={reason} onChange={e => setReason(e)}
                                            optionFilterProp="children"
                                            filterOption={(input, option) =>
                                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                            filterSort={(optionA, optionB) =>
                                                optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                            }
                                        >
                                            <Option value="Another meeting">Another meeting</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={12} lg={12} xl={12} push={1}>
                                    <label for=''>Anything Skillingo could have done to avoid your cancellation?</label>
                                    <Form.Item
                                        name="suggestion"
                                        rules={[{ message: 'Please enter your suggestion!', required: true }]}>
                                        <Input.TextArea placeholder='Text area(Optional)' id='suggestion'
                                            value={suggestion} onChange={e => setSuggestion(e.target.value)} />

                                    </Form.Item>
                                </Col>

                                <Col xs={24} sm={24} md={3} lg={3} xl={3} push={2}>
                                    <div className='btn-div reschedule-btn'>
                                        <Row>
                                            <Col xs={12} sm={12} md={24} lg={24} xl={24}>
                                                <div ><button id='cancel' className='cancel-btn'>cancel  <i><ArrowRightOutlined /></i>
                                                </button></div>
                                            </Col>

                                        </Row>
                                    </div>
                                </Col>
                            </Row>
                        </Form>

                    </div>
                </div>
            }
        </div>
    );

};

export default CancelInterview;
