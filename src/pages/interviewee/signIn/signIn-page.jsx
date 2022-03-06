import React, { useState, useEffect } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { Row, Col, Form, Input, Button, notification } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './signIn-page.scss';
import 'antd/dist/antd.css';
import { ArrowRightOutlined } from '@ant-design/icons';
import singInImg from '../../../../src/assets/imges/login.png';
import { useLocation } from 'react-router-dom';

import apiService from "../../../utils/apiService";
import Notification from "../../../components/notification/notification";



export const SignIn = (props) => {
    let data = useLocation();
    let mobileNo = data.state.mobileNo;
    console.log(mobileNo)
    console.log(user)
    const history = useHistory();
    // const dispatch = useDispatch();
    const isLoading = false;
    const [form] = Form.useForm();
    const [state, setState] = useState({
        checked: null,
        mobile: 1234567890,
    });
    const [mobile, setMobile] = useState("");
    const [otp, setOtp] = useState("");

    useEffect(() => {
        setMobile({ mobileNo })
    }, []);


    const handleSubmit = () => {
        apiService(`login/verifyotp`, 'post', { mobile: mobile, otp: otp }, false, '',
            result => {
                if (result.data) {
                    dispatch({
                        type: 'LOGIN_SUCCESS',
                        user: result.data,
                    });
                    Notification.openNotificationSuccess(result.data.message)
                    localStorage.setItem('login', true);
                    window.location = '/Dashboard'
                }
                // console.log(result.data)
            },
            (error) => {

            });
    };

    return (
        <div className="signin_page_container p_10">
            <div class='signin-container'>
                <Row>
                    <Col xs={24} sm={24} md={16} lg={16} xl={16}>
                        <div class='left-container'>
                            <Form name="signin" form={form} onFinish={handleSubmit} layout="vertical">
                                <header>
                                    <div class="header-name">
                                        <Row>
                                            <Col xs={17} sm={17} md={18} lg={18} xl={18}>
                                                <h1>Sign In</h1>
                                            </Col>
                                            <Col xs={7} sm={7} md={6} lg={6} xl={6}>
                                                <h4>or <Link to="/Signup"><span>Sign Up</span></Link></h4>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div class='set'>
                                        <Row>
                                            <Col xs={24} sm={24} md={22} lg={22} xl={22}>
                                                <label for=''>Mobile Number</label>
                                                <Form.Item
                                                    name="mobile"
                                                    rules={[{ message: 'Please enter your Mobile Number!', required: true }]}>
                                                    <input id='mobile' placeholder="Mobile Number" value={mobile.value} onChange={e => setMobile(e.target.value)} type='number' />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div class='set'>
                                        <Row>
                                            <Col xs={24} sm={24} md={22} lg={22} xl={22}>
                                                <label for=''>One Time Password </label>
                                                <Form.Item
                                                    name="otp"
                                                    rules={[{ message: 'Please enter one time password!', required: true }]}>
                                                    <input id='otp' placeholder="Type your one time password" value={otp} onChange={e => setOtp(e.target.value)} type='number' />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </div>
                                </header>
                                <footer>
                                    <div class='signin-footer'>
                                        <Row >
                                            <Col xs={10} sm={10} md={12} lg={12} xl={12}>
                                                <div ><button id='resend'>RESEND OTP <i><ArrowRightOutlined /></i></button></div>
                                            </Col>
                                            <Col xs={10} sm={10} md={12} lg={12} xl={12} push={1}>
                                                <Form.Item>
                                                    <button htmlType="submit" id='next'>VERIFY <i><ArrowRightOutlined /></i></button>
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </div>
                                </footer>
                            </Form>
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <div class='right-container'>
                            <img src={singInImg} />
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

function mapStateToProps(state) {
    return {
        user: state.user,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        Object.assign(
            {},
            actions,
        ), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
