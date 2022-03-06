import React, { useState, useEffect } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { Row, Col, Form, Input, Button, Checkbox, Spin } from 'antd'
import { useDispatch, useSelector } from 'react-redux';

import './signup-page.scss';
import 'antd/dist/antd.css';

import signupImg from '../../../../src/assets/imges/signinnew.png';
import { ArrowRightOutlined } from '@ant-design/icons';
import apiService from "../../../utils/apiService";
import Notification from "../../../components/notification/notification";





const Signup = () => {
    const history = useHistory();
    const [form1] = Form.useForm();
    const [form2] = Form.useForm();
    const [mobile, setMobile] = useState("");
    const [otp, setOtp] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [isAgree, setIsAgree] = useState("");
    const [singupAllForm, setsingupAllForm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isBtnLoading, setisBtnLoading] = useState(false);


    useEffect(() => {
        setTimeout(() => {
            setIsLoading(true);
        }, 1000);
    }, []);

    const handleSubmitFirst = () => {
        setisBtnLoading(true);
        apiService(`signup/mobile`, 'post', { contactNo: mobile, userRoleId: 2 }, false, '',
            result => {
                if (result.data.message == "Otp sent") {
                    setisBtnLoading(false);
                    Notification.openNotificationSuccess(result.data.message);
                    setsingupAllForm({ singupAllForm: true });
                } else {
                    setisBtnLoading(false);
                    Notification.openNotificationFaliure(result.data.message)
                }
            },
            (error) => {

            });

    };

    const handleSubmitSecond = () => {
        setisBtnLoading(true);
        apiService(`signup/details`, 'put', { contactNo: mobile, firstName: firstName, lastName: lastName, email: email, }, false, '',
            result => {
                if (result.data.jwt != null) {
                    setisBtnLoading(false);
                    localStorage.setItem('jwt', result.data.jwt);
                    Notification.openNotificationSuccess(result.data.message)
                    history.push('/yourself');
                } else {
                    Notification.openNotificationSuccess(result.data.message)
                    setisBtnLoading(false);
                }
            },
            (error) => {

            });
    };


    return (
        <div className="login_page_container">
            {isLoading == false ?
                <div className="spinner">
                    <Spin />
                </div> :
                <div class='login-container'>
                    <div class='left-container'>
                        {singupAllForm == false ?
                            <Form name="signup1" form={form1} onFinish={handleSubmitFirst} layout="vertical">
                                <header>
                                    <div class="header-name-sign">
                                        <div className='head-left'>
                                            <h1>Sign up</h1>
                                        </div>
                                        <div className='head-right'>
                                            <h4>Already have an account ?  <Link to="/login"><span>Login</span></Link></h4>
                                        </div>
                                    </div>
                                    {/* <div class="header-name">

                                        <h1>Sign up</h1>
                                        <h4>Already have an account ?  <Link to="/login"><span>Login</span></Link></h4>
                                    </div> */}
                                    <div className='form-details'>
                                        <div class='set'>
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

                                        </div>

                                        <footer>
                                            <div class='login-footer'>
                                                {!isBtnLoading && <Button htmlType="submit" type="primary" icon={<ArrowRightOutlined />} size="large"> NEXT STEP </Button>}
                                                {isBtnLoading && <Button htmlType="submit" type="primary" icon={<ArrowRightOutlined />} loading={isBtnLoading} size="large"> NEXT STEP </Button>}
                                            </div>
                                        </footer>
                                    </div>
                                </header>
                            </Form>
                            :
                            <Form name="singup2" form={form2} onFinish={handleSubmitSecond} layout="vertical">
                                <header>
                                    <div class="header-name-sign">
                                        <div className='head-left'>
                                            <h1>Sign up</h1>
                                        </div>
                                        <div className='head-right'>
                                            <h4>Already have an account ?  <Link to="/login"><span>Login</span></Link></h4>
                                        </div>
                                    </div>

                                    <div className='form-details'>
                                        <Form.Item style={{ marginBottom: 0 }}>
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
                                                }]}
                                                style={{ display: 'inline-block', width: 'calc(50%)' }}
                                            >
                                                <input id='mobile' placeholder="Phone Number"
                                                    value={mobile} onChange={e => setMobile(e.target.value)} type='number' />
                                            </Form.Item>
                                            <Form.Item

                                                name="otp"
                                                rules={[{ message: 'Please enter your OTP!', required: true }]}
                                                style={{ display: 'inline-block', width: 'calc(50% )', paddingLeft: 8 }}
                                            >
                                                <input placeholder="One Time Password"
                                                    value={otp} onChange={e => setOtp(e.target.value)} type='number' />
                                            </Form.Item>
                                        </Form.Item>


                                        <Form.Item style={{ marginBottom: 0 }}>
                                            <Form.Item
                                                name="firstName"
                                                rules={[{ message: 'Please enter your first name!', required: true }]}
                                                style={{ display: 'inline-block', width: 'calc(50%)' }}
                                            >
                                                <input placeholder="First Name"
                                                    value={firstName}
                                                    onChange={e => setFirstName(e.target.value)} type='text' />
                                            </Form.Item>
                                            <Form.Item
                                                name="lastName"
                                                rules={[{ message: 'Please enter your last name!', required: true }]}
                                                style={{ display: 'inline-block', width: 'calc(50%)', paddingLeft: 8 }}
                                            >
                                                <input placeholder="Last Name"
                                                    value={lastName} onChange={e => setLastName(e.target.value)} type='text' />
                                            </Form.Item>
                                        </Form.Item>
                                        <div>
                                            <Form.Item
                                                name="email"
                                                rules={[{ type: "email", message: 'The input is not valid Email' }, { message: 'Please enter your email!', required: true }]}>
                                                <input placeholder="Email" type='text' value={email} onChange={e => setEmail(e.target.value)} />
                                            </Form.Item>

                                        </div>
                                        <Form.Item
                                            name="agreement"
                                            valuePropName="checked"
                                            rules={[
                                                {
                                                    validator: (_, value) =>
                                                        value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                                                },
                                            ]}

                                        >
                                            <Checkbox>
                                                I agree to Skillingo's <a href="">Terms's of Services</a> and consent to Skillingo's Privacy Policy
                                            </Checkbox>
                                        </Form.Item>


                                        {/* <div>
                                            <Row>
                                                <Col xs={2} sm={2} md={2} lg={2} xl={2}>
                                                    <Checkbox ></Checkbox>
                                                </Col>
                                                <Col xs={20} sm={20} md={20} lg={20} xl={20}>
                                                    <h4>I agree to Skillingo's <a class='href' href='/Welcome'>Terms's of Services</a> and consent to Skillingo's Privacy Policy</h4>
                                                </Col>
                                            </Row>
                                        </div> */}

                                        <footer>
                                            <div class='login-footer'>
                                                <Form.Item>
                                                    {!isBtnLoading && <Button htmlType="submit" type="primary" icon={<ArrowRightOutlined />} size="large"> NEXT STEP </Button>}
                                                    {isBtnLoading && <Button htmlType="submit" type="primary" icon={<ArrowRightOutlined />} loading={isBtnLoading} size="large"> NEXT STEP </Button>}
                                                </Form.Item>

                                            </div>
                                        </footer>
                                    </div>
                                </header>
                            </Form>

                        }
                    </div>
                    <div className='right-container'>
                        <h1>Welcome to the world of opportunities</h1>
                        <img src={signupImg} />
                    </div>
                </div>
            }

        </div>
    );


}
export default Signup;
