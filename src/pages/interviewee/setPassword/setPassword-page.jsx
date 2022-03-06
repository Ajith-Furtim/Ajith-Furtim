import React, { useState, useEffect } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { Row, Col, Form, Input, Button, Spin } from 'antd';
import './setPassword-page.scss';
import 'antd/dist/antd.css';
import { ArrowRightOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import loginImg from '../../../../src/assets/imges/login.png';

import apiService from "../../../utils/apiService";
import Notification from "../../../components/notification/notification";


const SetPaasword = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [form] = Form.useForm();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newPassword, setnewPassword] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(true);
        }, 100);
    }, []);


    const handleSubmit = () => {
        apiService(`login/email/setpassword`, 'post', { password: newPassword, token: "" }, false, '',
            result => {
                if (result.data) {
                    Notification.openNotificationSuccess(result.data.message)
                } else {
                    Notification.openNotificationFaliure(result.data.message)
                }
            },
            (error) => {

            });
    };

    const checkPassword = (rule, value, callback) => {
        if (value && value !== password) {
            callback("The passwords don't match");
        } else {
            callback();
        }
    };




    return (

        <div className="login_page_container p_10">
            {isLoading == false ?
                <div className="spinner">
                    <Spin />
                </div> :
                <div class='login-container'>
                    <Row>
                        <Col xs={24} sm={24} md={16} lg={16} xl={16}>
                            <div class='left-container'>

                                <Form name="login" form={form} onFinish={handleSubmit} layout="vertical">
                                    <header>
                                        <div class="header-name">
                                            <Row>
                                                <Col xs={17} sm={17} md={18} lg={18} xl={18}>
                                                    <h1>Set Password</h1>
                                                </Col>
                                            </Row>
                                        </div>
                                        <div className='form-details'>
                                            <div class='set'>
                                                <Row>
                                                    <Col xs={24} sm={24} md={22} lg={22} xl={22}>
                                                        <label> Password</label>
                                                        <Form.Item
                                                            name="password"
                                                            rules={[{ message: 'Please enter your password!', required: true }]}>
                                                            <input id='password' placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} type='password' />
                                                        </Form.Item>
                                                    </Col>
                                                </Row>
                                            </div>
                                            <div>
                                                <Row>
                                                    <Col xs={24} sm={24} md={22} lg={22} xl={22}>
                                                        <label for=''>Confirm Password</label>
                                                        <Form.Item
                                                            name="newPassword"
                                                            rules={[{ message: 'Please enter yourc confirm password!', required: true }, { validator: checkPassword }]}>
                                                            <input id='newPassword' placeholder="Confirm Password" value={newPassword} onChange={e => setnewPassword(e.target.value)} type='password' />
                                                        </Form.Item>
                                                    </Col>
                                                </Row>

                                            </div>
                                        </div>
                                    </header>
                                    <footer>
                                        <div class='signin-footer'>
                                            <Row >
                                                <Col xs={10} sm={10} md={12} lg={12} xl={12} push={12}>
                                                    <Form.Item>
                                                        <button htmlType="submit" id='next'>SUBMIT</button>
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
                                <img src={loginImg} />
                            </div>
                        </Col>
                    </Row>
                </div>
            }
        </div >
    );
};

export default SetPaasword;
