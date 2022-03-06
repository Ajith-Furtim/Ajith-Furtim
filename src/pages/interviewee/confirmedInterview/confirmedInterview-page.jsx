import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';



import './confirmedInterview-page.scss';
import 'antd/dist/antd.css';
import { Row, Col, Button, Input, Space, Card, Select, Rate, Avatar, Image, Modal, Spin } from 'antd';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { ArrowRightOutlined, PhoneFilled, CheckCircleTwoTone, RightOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

import userImg from '../../../../src/assets/imges/user.png';
import apiService from "../../../utils/apiService";
import moment from 'moment';
import Notification from "../../../components/notification/notification";
const ConfirmedInterview = () => {
    const history = useHistory();
    const { confirm } = Modal;
    const location = useLocation();
    const jwt = localStorage.getItem('jwt');
    const userId = localStorage.getItem('userId');
    const localData = localStorage.getItem("loginData");
    const loginData = JSON.parse(localData);
    console.log(loginData)
    let interViewerDetails = location.state.data;
    let sloatSelectValue = location.state.selectValue;
    const [isLoading, setIsLoading] = useState(true);
    const [userDetails, setUserDetails] = useState("");


    console.log(interViewerDetails);
    console.log(sloatSelectValue);

    const { Search } = Input;
    const { Meta } = Card;
    const { Option } = Select;

    function showConfirm() {
        confirm({
            title: 'Do you want to paynow?',
            icon: <ExclamationCircleOutlined />,
            onOk() {
                setIsLoading(false);
                payNow();
            },
            onCancel() {
            },
        });
    }

    function showConfirmRe() {
        confirm({
            title: 'Do you want to reschedule?',
            icon: <ExclamationCircleOutlined />,
            onOk() {
                setIsLoading(false);
                history.push({ pathname: '/interviewerprofile', state: { data: interViewerDetails, isPayment: "N" } });
            },
            onCancel() {
            },
        });
    }

    useEffect(() => {
        getUserDetails();
    }, []);



    const getUserDetails = () => {
        setIsLoading(false);
        apiService(`users/details//` + userId, 'get', '', false, jwt,
            result => {
                if (result.data) {
                    console.log(result.data)
                    setUserDetails(result.data)
                    setIsLoading(true);
                }
            },
            (error) => {

            });
    };


    const bookingConfirmed = () => {
        setIsLoading(false);
        apiService(`schedule/bookingconfirmed`, 'put', { id: sloatSelectValue.id, }, false, jwt,
            result => {
                if (result.data.message == "Booking confirmed") {
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
    };




    const payNow = () => {
        // // var amount = parseFloat(interViewerDetails.interviewerInfo.amount) * 100;
        // var amount = parseFloat(interViewerDetails.interviewerInfo.amount ? interViewerDetails.interviewerInfo.amount : 0) * 100
        // Notification.openNotificationFaliure(amount)
        apiService(`payment/create`, 'post', { scheduleId: sloatSelectValue.id, amount: interViewerDetails.interviewerInfo.amount, "receipt": "Receipt no" + " - " + sloatSelectValue.id + " - " + moment().format('DDMMYYYY') }, false, jwt,
            result => {
                if (result) {
                    setIsLoading(true);
                    console.log(result)
                    payForOrder(result.data)
                } else {
                    setIsLoading(true);
                    Notification.openNotificationFaliure(result.data.message)
                }
            },
            (error) => {

            });
    };


    const payForOrder = (data) => {
        console.log(data)
        const options = {
            "key": data.secretKey,
            "amount": data.amount,
            "name": "Skilngo Interviewee Pay",
            "description": "Skilngo Interviewee for scheduleId : " + sloatSelectValue.id,
            "order_id": data.razorpayOrderId,
            "enabled": {
                "escape": false
            },
            "prefill": {
                "name": userDetails.firstName + userDetails.lastName,
                "email": userDetails.email,
                "contact": userDetails.contactNo,
            },
            "notes": {
                "Company": "Skilngo",
                "Payment": "schedule Payment",
                // "Order Id": data.quotationId,
                // "Customer Name": data.name,
                // "Email": data.email,
                // "Contact No": data.contactno,
                // "Amount": data.amount
            },
            "theme": {
                "color": "#dc3545"
            }
        };

        options.handler = ((response, error) => {
            console.log(response)
            options.response = response;
            paymentSuccessCall(response);
            bookingConfirmed();
        });

        // options['modal.ondismiss'] = this.paymentFailureCall.bind(this);

        // console.log(options);
        const rzp1 = new window.Razorpay(options);
        rzp1.on('payment.failed', function (response) {
            console.log("Payment Failed");
        });
        rzp1.open();
    };

    const paymentSuccessCall = (data) => {
        apiService(`payment/update`, 'put', {
            "orderId": data.razorpay_order_id,
            "paymentId": data.razorpay_payment_id,
            "scheduleId": sloatSelectValue.id,
            "signature": data.razorpay_signature
        }, false, jwt,
            result => {
                if (result) {
                    console.log(result)
                } else {
                    setIsLoading(true);
                    Notification.openNotificationFaliure(result.data.message)
                }
            },
            (error) => {

            });
    };



    return (
        <div className="confirmedInterview_page_container p_10">
            {isLoading == false ?
                <div className="spinner">
                    <Spin />
                </div> :
                <div className='schedule-container'>
                    <div className='schedule-head'>
                        <Row>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <h2>Confirmed interview | {interViewerDetails.interviewerInfo.companyname} | {moment(sloatSelectValue.date).format('DD MMM YYYY')} {sloatSelectValue.time} IST</h2>
                            </Col>
                        </Row>
                        <div className='schedule-card'>
                            <Row>
                                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                    <div className='card-box'>
                                        <div className='card-head'>
                                            <div className='card-header'>
                                                <CheckCircleTwoTone twoToneColor="#52c41a" />
                                                <h1>Booking Confirmed</h1>
                                            </div>
                                        </div>
                                        <div className='user-details'>
                                            <div className='card-header'>
                                                <Avatar src={userImg} />
                                                <h4>Congratulations. Your interview with Mr.{interViewerDetails.firstName} {interViewerDetails.lastName} has been confirmed.</h4>
                                            </div>
                                        </div>
                                        <div className='card-footer'>
                                            <div className='footer-details'>
                                                <Row>
                                                    <Col xs={24} sm={24} md={20} lg={20} xl={20} className='date-time'>
                                                        <div>
                                                            <h3> {moment(sloatSelectValue.date).format('DD MMM YYYY')}</h3>
                                                            <h4>{sloatSelectValue.time} IST</h4>
                                                        </div>
                                                    </Col>
                                                    <Col xs={24} sm={24} md={4} lg={4} xl={4} push={12}>

                                                        <Button onClick={showConfirmRe} className='res-btn'>
                                                            RESCHEDULE	<i><ArrowRightOutlined /></i>
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8} push={2}>
                                    <div className='card-box-payment'>
                                        <div className='card-head'>
                                            <div className='card-header'>
                                                <h3>Payment Summary</h3>
                                            </div>
                                        </div>
                                        <div className='user-details'>
                                            <div className='card-header'>
                                                <Row className='rate-row'>
                                                    <Col xs={16} sm={16} md={20} lg={20} xl={10}>
                                                        <h4>Total</h4>
                                                    </Col>
                                                    <Col xs={8} sm={8} md={4} lg={4} xl={4} push={6}>
                                                        <h4 className='rupess'>Rs {interViewerDetails.interviewerInfo.amount}</h4>
                                                    </Col>
                                                </Row>
                                                <Row className='rate-row'>
                                                    <Col xs={16} sm={16} md={20} lg={20} xl={10}>
                                                        <h4>GST(18%)</h4>
                                                    </Col>
                                                    <Col xs={8} sm={8} md={4} lg={4} xl={4} push={6}>
                                                        <h4 className='rupess'>Rs 0</h4>
                                                    </Col>
                                                </Row>
                                                <Row className='rate-row'>
                                                    <Col xs={16} sm={16} md={20} lg={20} xl={10}>
                                                        <h4>Credits</h4>
                                                    </Col>
                                                    <Col xs={8} sm={8} md={4} lg={4} xl={4} push={6}>
                                                        <h4 className='rupess'>Rs 0</h4>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </div>
                                        <div className='card-footer'>
                                            <div className='footer-details'>
                                                <Row>
                                                    <Col xs={16} sm={16} md={20} lg={20} xl={10}>
                                                        <h3>Amount to pay</h3>
                                                    </Col>
                                                    <Col xs={8} sm={8} md={4} lg={4} xl={4} push={6}>
                                                        <h3 className='total-rup'>Rs {interViewerDetails.interviewerInfo.amount}</h3>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24} className='pay-btn-head'>
                                                        <Button onClick={showConfirm} className='pay-btn'>
                                                            PAYNOW
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                    <div className='card-box-service'>
                                        <div className='card-head'>
                                            <div className='card-header'>
                                                <Row>
                                                    <Col xs={22} sm={22} md={22} lg={22} xl={22}>
                                                        <h3>Service Checklist</h3>
                                                        <h4>See what all you should know or do before the interview begins.
                                                        </h4>
                                                    </Col>
                                                    <Col xs={2} sm={2} md={2} lg={2} xl={2} className='right-arrow'>
                                                        <i><RightOutlined /></i>
                                                    </Col>

                                                </Row>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <Row className='card-box-help'>
                                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                    <div className='card-box-service'>
                                        <div className='card-head help-head'>
                                            <div className='card-header'>
                                                <Row>
                                                    <Col xs={16} sm={16} md={16} lg={16} xl={16}>
                                                        <h3>Need our help?</h3>
                                                        <h4>Call use in case you need assistance in our service.</h4>
                                                    </Col>
                                                    <Col xs={24} sm={24} md={8} lg={8} xl={8} className='right-arrow ph-number'>
                                                        <Button className='ph-btn'>
                                                            +91 9500000XXXX	<i><PhoneFilled /></i>
                                                        </Button>
                                                    </Col>

                                                </Row>

                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>

                </div>
            }
        </div>
    );
};

export default ConfirmedInterview;
