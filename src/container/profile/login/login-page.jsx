import React, { useState, useEffect } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { Row, Col, Form, Input, Button, Spin } from 'antd';
import './login-page.scss';
import 'antd/dist/antd.css';
import { ArrowRightOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
// import loginImg from 'src/assets/imges/loginnew1.png';

import apiService from "../../../utils/apiService";
import Notification from "../../../components/notification/notification";
import { login } from '../../../redux/authentication/actionCreator';


const Login = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [state, setState] = useState({
        checked: null,
        mobile: '',
    });
    const [mobile, setMobile] = useState("");
    const [otp, setOtp] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [otpInput, setOtpInput] = useState(false);
    const [url, setUrl] = useState("");
    const [mobileForm, setMobileForm] = useState(false);
    const [otpForm, setOtpForm] = useState(false);
    const [emailForm, setEmailForm] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [isBtnLoading, setisBtnLoading] = useState(false);


    useEffect(() => {
        localStorage.clear();
        setTimeout(() => {
            setIsLoading(true);
        }, 1000);
    }, []);

    const handleSubmitMobile = () => {
        apiService(`login/mobile`, 'post', { mobile: mobile, }, false, '',
            result => {
                if (result.data) {
                    Notification.openNotificationSuccess(result.data.message)
                    // setOtpForm(true);
                    // setMobileForm(false);
                }
            },
            (error) => {

            });
    };


    const handleSubmitOTP = () => {
        apiService(`login/verifyotp`, 'post', { mobile: mobile, }, false, '',
            result => {
                if (result.data) {
                    Notification.openNotificationSuccess(result.data.message)
                    // dispatch({
                    //     type: 'LOGIN_SUCCESS',
                    //     user: result.data,
                    // });
                    // localStorage.setItem('login', true);
                    // window.location = '/interviews'
                }
            },
            (error) => {

            });
    };

    const handleSubmitEmail = () => {
        setisBtnLoading(true);
        apiService(`login/email`, 'post', { email: email, password: password }, false, '',
            result => {
                if (result.data.message == "Login Successful") {
                    Notification.openNotificationSuccess(result.data.message)
                    dispatch({
                        type: 'LOGIN_SUCCESS',
                        user: result.data,
                    });
                    localStorage.setItem('login', true);
                    localStorage.setItem('loginData', JSON.stringify(result.data));
                    localStorage.setItem('userRole', result.data.role);
                    localStorage.setItem('jwt', result.data.jwt);
                    localStorage.setItem('userId', result.data.userid);
                    localStorage.setItem('name', result.data.firstname);

                    // if (result.data.role == "INTERVIEWEE") {
                    //     window.location = '/interviews'
                    // } else if (result.data.role == "INTERVIEWER") {
                    //     window.location = '/interviwer/interviews'
                    // } else {
                    //     window.location = '/admin/dashboard'
                    // }
                    dispatch(login());
                    history.push('/interviewee');
                    setisBtnLoading(false);
                    // setOtpInput(true);
                } else {
                    setisBtnLoading(false);
                    Notification.openNotificationFaliure(result.data.message)
                }
            },
            (error) => { });
    };

    const loginWithEmail = () => {
        setOtpForm(false);
        setMobileForm(false);
        setEmailForm(true);
    };

    const loginWithMobile = () => {
        setMobileForm(true);
        setOtpForm(false);
        setEmailForm(false);
    };



    return (

        <div className="login_page_container">
            {isLoading == false ?
                <div className="spinner">
                    <Spin />
                </div> :
                <div class='login-container'>
                    <div class='left-container'>
                        {mobileForm == true ?
                            <Form name="login" form={form} onFinish={handleSubmitMobile} layout="vertical">
                                <header>
                                    <div class="header-name">
                                        <Row>
                                            <Col xs={17} sm={17} md={18} lg={18} xl={18}>
                                                <h1>Login</h1>
                                            </Col>
                                            <Col xs={7} sm={7} md={6} lg={6} xl={6}>
                                                <h4>or <Link to="/signup"><span>Sign Up</span></Link></h4>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className='form-details'>
                                        <div>
                                            <Row>
                                                <Col xs={24} sm={24} md={22} lg={22} xl={22}>
                                                    <label for=''>Phone Number</label>
                                                    <Form.Item
                                                        name="mobile"
                                                        rules={[{
                                                            type: "regexp",
                                                            pattern: /^(?:\d*)$/,
                                                            message: "Value should contain just number"
                                                        },
                                                        {
                                                            min: 10,
                                                            max: 10,
                                                            message: "phone number must be 10 digits",
                                                        },
                                                        {
                                                            message: 'Please enter your phone number!',
                                                            required: true
                                                        }]}>
                                                        <input id='mobile' placeholder="Phone Number" value={mobile} onChange={e => setMobile(e.target.value)} type='number' />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={24} sm={24} md={22} lg={22} xl={22} push={15}>
                                                    <h4 className='switch-login' onClick={loginWithEmail}>Want to use Email?</h4>
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>

                                </header>
                                <footer>
                                    <div class='login-footer'>
                                        <Row >
                                            <Col xs={10} sm={10} md={12} lg={12} xl={12} push={12}>
                                                <Form.Item>
                                                    <button htmlType="submit" id='next'>LOGIN <i><ArrowRightOutlined /></i></button>
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </div>
                                </footer>
                            </Form> : null}
                        {otpForm == true ?
                            <Form name="login" form={form} onFinish={handleSubmitOTP} layout="vertical">
                                <header>
                                    <div class="header-name">
                                        <Row>
                                            <Col xs={17} sm={17} md={18} lg={18} xl={18}>
                                                <h1>Login</h1>
                                            </Col>
                                            <Col xs={7} sm={7} md={6} lg={6} xl={6}>
                                                <h4>or <Link to="/signup"><span>Sign Up</span></Link></h4>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className='form-details'>
                                        <div class='set'>
                                            <Row>
                                                <Col xs={24} sm={24} md={22} lg={22} xl={22}>
                                                    <label for=''>You would have received the OTP on your phone number</label>
                                                    <Form.Item
                                                        name="mobile"
                                                        rules={[{
                                                            type: "regexp",
                                                            pattern: /^(?:\d*)$/,
                                                            message: "Value should contain just number"
                                                        },
                                                        {
                                                            min: 10,
                                                            max: 10,
                                                            message: "Value should be 10 character",
                                                        },
                                                        {
                                                            message: 'Please enter your phone number!',
                                                            required: true
                                                        }]}>
                                                        <input id='mobile' placeholder="Phone Number" value={mobile} onChange={e => setMobile(e.target.value)} type='number' />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </div>

                                        <div>
                                            <Row>
                                                <Col xs={24} sm={24} md={22} lg={22} xl={22}>
                                                    {/* <label for=''>One Time Password </label> */}
                                                    <Form.Item
                                                        name="otp"
                                                        rules={[{ message: 'Please enter one time password!', required: true }]}>
                                                        <input id='otp' placeholder="Type your one time password" value={otp} onChange={e => setOtp(e.target.value)} type='number' />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                            {/* <Row>
                                                    <Col xs={24} sm={24} md={22} lg={22} xl={22} push={16}>
                                                        <h4 className='switch-login' onClick={loginWithEmail}>Want to use email?</h4>
                                                    </Col>
                                                </Row> */}
                                        </div>
                                    </div>
                                </header>
                                <footer>
                                    <div class='signin-footer'>
                                        <Row >
                                            <Col xs={12} sm={12} md={12} lg={12} xl={12} >
                                                <button id='resend' >RESEND OTP   <i><ArrowRightOutlined /></i></button>
                                            </Col>
                                            <Col xs={10} sm={10} md={12} lg={12} xl={12}>
                                                <Form.Item>
                                                    <button htmlType="submit" id='next'>LOGIN <i><ArrowRightOutlined /></i></button>
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </div>
                                </footer>
                            </Form> : null}
                        {emailForm == true ?
                            <Form name="login" form={form} onFinish={handleSubmitEmail} layout="vertical">
                                <header>
                                    <div class="header-name">
                                        <div className='head-left'>
                                            <h1>Login</h1>
                                        </div>
                                        <div className='head-right'>
                                            <h4>or <Link to="/signup"><span>Sign Up</span></Link></h4>
                                        </div>
                                    </div>
                                    <div className='form-details'>
                                        <div>
                                            {/* <label >Email</label> */}
                                            <Form.Item
                                                name="email"
                                                rules={[{ type: "email", message: 'The input is not valid Email' }, { message: 'Please enter your email!', required: true }]}>
                                                <input placeholder="Email" type='text' value={email} onChange={e => setEmail(e.target.value)} />
                                            </Form.Item>

                                        </div>
                                        <div>
                                            {/* <label for=''>Password</label> */}
                                            <Form.Item
                                                name="password"
                                                rules={[{ message: 'Please enter your password!', required: true }]}>
                                                <input id='password' placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} type='password' />
                                            </Form.Item>

                                            {/* <Row>
                                                        <Col xs={24} sm={24} md={22} lg={22} xl={22} push={15}>
                                                            <h4 className='switch-login' onClick={loginWithMobile}>Want to use Phone?</h4>
                                                        </Col>
                                                    </Row> */}
                                        </div>
                                    </div>
                                </header>
                                <footer>
                                    <div class='login-footer'>
                                        <Form.Item>
                                            {!isBtnLoading && <Button htmlType="submit" type="primary" icon={<ArrowRightOutlined />} size="large">LOGIN </Button>}
                                            {isBtnLoading && <Button htmlType="submit" type="primary" icon={<ArrowRightOutlined />} loading={isBtnLoading} size="large">LOGIN </Button>}
                                        </Form.Item>
                                    </div>
                                </footer>
                            </Form> : null}
                    </div>
                    <div className='right-container'>
                        <h1>Measure your self with critical feedback on where yor are today</h1>
                        {/* <img src={loginImg} /> */}
                    </div>
                </div>
            }
        </div>
    );
};

export default Login;
