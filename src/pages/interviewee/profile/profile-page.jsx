import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';


import './profile-page.scss';
import 'antd/dist/antd.css';
import { Row, Col, Button, Input, Space, Card, Select, Rate, Avatar, Image, Checkbox, Form, Spin } from 'antd';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { ArrowRightOutlined, PhoneFilled, CheckCircleTwoTone, RightOutlined, EditOutlined } from '@ant-design/icons';

import userImg from '../../../../src/assets/imges/user.png';
import apiService from "../../../utils/apiService";
import apiJavaService from "../../../utils/javaApiService";
import Notification from "../../../components/notification/notification";

const Profile = () => {
    const jwt = localStorage.getItem('jwt');
    const userId = localStorage.getItem('userId');
    const [form1] = Form.useForm();
    const [form2] = Form.useForm();
    const { Search } = Input;
    const { Meta } = Card;
    const { Option } = Select;
    const [profileDetails, setProfileDetails] = useState("");
    const [mobile, setMobile] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [password, setPassword] = useState("");
    const [currentpassword, setCPassword] = useState("");
    const [newpassword, setNPassword] = useState("");




    useEffect(() => {
        getProfile();
    }, []);


    const getProfile = () => {
        apiService(`users/details/${userId}`, 'get', '', false, jwt,
            result => {
                if (result.data) {
                    console.log(result.data)
                    setProfileDetails(result.data.userInfo);
                    setFirstName(result.data.userInfo.firstName);
                    setLastName(result.data.userInfo.lastName);
                    setEmail(result.data.userInfo.email);
                    setMobile(result.data.userInfo.contactNo);
                    setIsLoading(true)
                }
            },
            (error) => {

            });
    };


    const handleSubmit = () => {
        setIsLoading(false);
        // let formData = new FormData();
        // formData.append('firstName', firstName)
        // formData.append('lastName', lastName)
        // formData.append('email', email)
        // formData.append('contactNo', mobile)
        apiService(`users/updateprofile`, 'put', { "firstName": firstName, "lastName": lastName }, false, jwt,
            result => {
                if (result.data) {
                    setIsLoading(true);
                    Notification.openNotificationSuccess(result.data.message);
                } else {
                    setIsLoading(true);
                    Notification.openNotificationFaliure(result.data.message)
                }
            },
            (error) => {

            });

    };


    const handleSubmitPassword = () => {
        setIsLoading(false);
        apiService(`users/updatepassword`, 'put', { password: currentpassword, newPassword: newpassword }, false, jwt,
            result => {
                if (result.data.message) {
                    Notification.openNotificationSuccess(result.data.message)
                    setPassword("");
                    setCPassword("");
                    setNPassword("");
                    setIsLoading(true);

                } else {
                    setIsLoading(true);
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
        <div className="profile_page_container p_10">
            {isLoading == false ?
                <div className="spinner">
                    <Spin />
                </div> : <div className='profile-container'>
                    <Form name="profile" form={form1} onFinish={handleSubmit} layout="vertical">
                        <Row>
                            <Col xs={24} sm={24} md={19} lg={19} xl={19}>
                                <h2>My Profile</h2>
                            </Col>
                            <Col xs={24} sm={24} md={5} lg={5} xl={5} push={1}>
                                <div className='btn-div'>
                                    <Row>
                                        <Col xs={12} sm={12} md={10} lg={10} xl={10}>
                                            <button id='cancel' >CANCEL</button>
                                        </Col>
                                        <Col xs={12} sm={12} md={14} lg={14} xl={14} pull={2}>
                                            <button id='save' >SAVE CHANGES</button>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={24} sm={24} md={20} lg={20} xl={20}>
                                <div class='set'>
                                    <Row>
                                        <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                                            <label for=''>First Name</label>
                                            <Form.Item
                                                name="firstName"
                                                initialValue={profileDetails.firstName}
                                                rules={[{ message: 'Please enter your first name!', required: true }]}>
                                                <input placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} type='text' />
                                            </Form.Item>

                                        </Col>
                                        <Col xs={24} sm={24} md={6} lg={6} xl={6} push={2}>
                                            <label for=''>Last Name</label>
                                            <Form.Item
                                                name="lastName"
                                                initialValue={profileDetails.lastName}
                                                rules={[{ message: 'Please enter your last name!', required: true }]}>
                                                <input placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} type='text' />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </div>
                                <div class='set'>
                                    <Row>
                                        <Col xs={24} sm={24} md={14} lg={14} xl={14}>
                                            <label for=''>Email ID</label>
                                            <Form.Item
                                                name="email"
                                                initialValue={profileDetails.email}
                                                rules={[{ type: "email", message: 'The input is not valid Email' }, { message: 'Please enter your email!', required: true }]}>
                                                <input disabled placeholder="Email" type='text' value={email} onChange={e => setEmail(e.target.value)} />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </div>
                                <div class='set'>
                                    <Row>
                                        <Col xs={24} sm={24} md={14} lg={14} xl={14}>
                                            <label for=''>Phone Number</label>
                                            <Form.Item
                                                name="mobile"
                                                initialValue={profileDetails.contactNo}
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
                                                <input disabled id='mobile' placeholder="Phone Number" value={mobile} onChange={e => setMobile(e.target.value)} type='number' />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                            <Col xs={24} sm={24} md={4} lg={4} xl={4} pull={5}>
                                <div className='card-header'>
                                    <Avatar src={userImg} />
                                    <i><EditOutlined /></i>
                                </div>
                            </Col>
                        </Row>
                    </Form>


                    <Form name="profile" form={form2} onFinish={handleSubmitPassword} layout="vertical">
                        <div className='btn-div'>
                            <Row>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <h3>Do you want change the Password?</h3>
                                </Col>
                                <Col xs={24} sm={24} md={4} lg={4} xl={4}>
                                    <button id='change' >Change Password</button>
                                </Col>
                            </Row>
                        </div>

                        <Row>
                            <Col xs={24} sm={24} md={20} lg={20} xl={20}>
                                <div class='set'>
                                    <Row>
                                        <Col xs={24} sm={24} md={14} lg={14} xl={14}>
                                            <label for=''>Current Password</label>
                                            <Form.Item
                                                name="currentpassword"
                                                rules={[{ message: 'Please enter your current password!', required: true }]}>
                                                <input id='currentpassword' placeholder="Current Password" value={currentpassword} onChange={e => setCPassword(e.target.value)} type='password' />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={24} sm={24} md={14} lg={14} xl={14}>
                                <Row>
                                    <Col xs={24} sm={23} md={20} lg={20} xl={20}>
                                        <label for=''>New Password</label>
                                        <Form.Item
                                            name="password"
                                            rules={[{ message: 'Please enter your password!', required: true }]}>
                                            <input id='password' placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} type='password' />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs={24} sm={24} md={10} lg={10} xl={10} pull={2}>
                                <div class=''>
                                    <Row>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                            <label for=''>Confirm Password</label>
                                            <Form.Item
                                                name="newpassword"
                                                rules={[{ message: 'Please enter your confirm password!', required: true }, { validator: checkPassword }]}>
                                                <input id='newpassword' placeholder="Confirm Password" value={newpassword} onChange={e => setNPassword(e.target.value)} type='password' />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>

                        <Row className='profile-footer'>
                            <Col xs={1} sm={1} md={1} lg={1} xl={1}>
                                <Checkbox ></Checkbox>
                            </Col>
                            <Col xs={22} sm={22} md={22} lg={23} xl={22}>
                                <h4>Option in to receive communications related new skills or interview in Skillingo</h4>
                            </Col>
                        </Row>
                    </Form>


                </div>
            }
        </div>
    );
};

export default Profile;
