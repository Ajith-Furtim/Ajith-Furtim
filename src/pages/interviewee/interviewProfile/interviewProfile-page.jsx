import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './interviewProfile-page.scss';
import 'antd/dist/antd.css';
import { Row, Col, Button, Input, Space, Card, Select, Rate, Avatar, Image, Steps, Badge, Spin, Modal } from 'antd';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { ArrowRightOutlined, AudioOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';

import userImg from '../../../../src/assets/imges/user.png';
import apiService from "../../../utils/apiService";
import moment from 'moment';
import Notification from "../../../components/notification/notification";


const InterviewProfile = () => {
    const history = useHistory();
    const { confirm } = Modal;

    let data = useLocation();
    let interViewerDetails = data.state.data;
    let reason = data.state.reason;
    let isPayment = data.state.isPayment;
    let reschedule = data.state.reschedule;

    console.log(interViewerDetails)
    console.log(isPayment)
    console.log(reschedule)
    const { Meta } = Card;
    const jwt = localStorage.getItem('jwt');
    const userId = localStorage.getItem('userId');

    // const [interViewerDetails, setInterViewerDetails] = useState("");
    const [slots, setSlots] = useState([]);
    const [testimonials, setTestimonials] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectItemId, setSelectItemId] = useState("");
    const [selectValue, setselectValue] = useState("");



    useEffect(() => {
        getInterviewerDetails();
    }, []);

    function showConfirm() {
        if (selectValue != "") {
            confirm({
                title: 'Do you want to book the slot?',
                icon: <ExclamationCircleOutlined />,
                // content: 'Some descriptions',
                onOk() {
                    setIsLoading(false);
                    if (isPayment == "N") {
                        bookSloatBeforepaymnet();
                    } else if (reschedule == "Y") {
                        bookSloatAfterpaymnet();
                    } else {
                        bookSloat();

                    }
                },
                onCancel() {
                },
            });
        } else {
            Notification.openNotificationFaliure("Please select slot!")
        }
    }


    const getInterviewerDetails = () => {
        apiService(`myinterview/schedulelist/` + interViewerDetails.userId, 'get', '', false, jwt,
            result => {
                if (result.data) {
                    console.log(result.data)
                    // setInterViewerDetails(result.data)
                    setSlots([...result.data]);
                    setIsLoading(true);
                    // setTestimonials([...result.data.testimonials]);
                }
            },
            (error) => {

            });
    };


    const bookSloat = () => {
        apiService(`schedule/pickinterviewer`, 'put', { id: selectItemId, }, false, jwt,
            result => {
                if (result.data.message == "Interview scheduled") {
                    Notification.openNotificationSuccess(result.data.message)
                    history.push({ pathname: '/confirmedinterview', state: { data: interViewerDetails, selectValue: selectValue } });
                    setIsLoading(true);
                } else {
                    setIsLoading(true);
                    Notification.openNotificationFaliure(result.data.message)
                }
            },
            (error) => {

            });
    };

    const bookSloatBeforepaymnet = () => {
        apiService(`schedule/beforepaymnet`, 'put', { id: selectItemId, }, false, jwt,
            result => {
                if (result.data.message) {
                    Notification.openNotificationSuccess(result.data.message)
                    history.push({ pathname: '/confirmedinterview', state: { data: interViewerDetails, selectValue: selectValue } });
                    setIsLoading(true);
                } else {
                    setIsLoading(true);
                    Notification.openNotificationFaliure(result.data.message)
                }
            },
            (error) => {

            });
    };


    const bookSloatAfterpaymnet = () => {
        apiService(`schedule/afterpaymnet`, 'put', {
            id: interViewerDetails.id, "rescheduleId": selectItemId,
            "reason": reason
        }, false, jwt,
            result => {
                if (result.data.message) {
                    Notification.openNotificationSuccess(result.data.message)
                    history.push({ pathname: '/confirmedinterview', state: { data: interViewerDetails, selectValue: selectValue } });
                    setIsLoading(true);
                } else {
                    setIsLoading(true);
                    Notification.openNotificationFaliure(result.data.message)
                }
            },
            (error) => {

            });
    };

    const handleClickSloat = (value) => {
        console.log(value);
        setselectValue(value);
        setSelectItemId(value.id);

    }

    return (
        <div className="interviewProfile_page_container p_10">
            {isLoading == false ?
                <div className="spinner">
                    <Spin />
                </div> :
                <div className='interviewProfile-container'>
                    <Row>
                        <Col xs={24} sm={24} md={18} lg={18} xl={18}>
                            <Row className='interviewProfile-head'>
                                <Col xs={24} sm={24} md={4} lg={4} xl={4}>
                                    <Avatar src={userImg} />
                                </Col>
                                <Col xs={24} sm={24} md={12} lg={12} xl={12} className='user-details'>
                                    <h2>{interViewerDetails.firstName} {interViewerDetails.lastName}</h2>
                                    <i><Rate disabled defaultValue={interViewerDetails.interviewerInfo.overAllRating} /></i>
                                </Col>
                            </Row>
                            <Row className='userinfo-head'>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                    <h4>{interViewerDetails.interviewerInfo.description}</h4>
                                </Col>
                            </Row>
                            <Row className='userskill-head'>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                    <Row className='userskill-details'>
                                        <Col xs={24} sm={24} md={6} lg={6} xl={6} push={1}>
                                            <h4>Level</h4>
                                            <h3>{interViewerDetails.interviewerInfo.level}</h3>
                                        </Col>
                                        <Col xs={24} sm={24} md={3} lg={3} xl={3}>
                                            <h4>Experience</h4>
                                            <h3>{interViewerDetails.interviewerInfo.experience}</h3>
                                        </Col>
                                        <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                                            <h4>Skills</h4>
                                            <h3>{interViewerDetails.interviewerInfo.skills}</h3>
                                        </Col>
                                        <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                                            <h4>Interviews</h4>
                                            <h3>{interViewerDetails.interviewerInfo.interviewedCount}</h3>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            {/* <div className='relateduser-title'>
                                <Row>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <h4>Testimonials</h4>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <h2>Words from satisfied users</h2>
                                    </Col>
                                </Row>
                            </div> */}
                            <Row className='relateduser-head'>

                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                    <Row className='relateduser-details'>
                                        {testimonials.map(item => {
                                            return (
                                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                    <Card hoverable className='card-box'>
                                                        <div class='card-header'>
                                                            <Row>
                                                                <Col xs={24} sm={24} md={24} lg={24} xl={24} className='card-rate'>
                                                                    <i><Rate disabled defaultValue={item.rating} /></i>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                        <Meta
                                                            description={item.testimony}
                                                        />
                                                        <footer className='card-footer'>
                                                            <Row >
                                                                <Col xs={7} sm={7} md={7} lg={7} xl={7}>
                                                                    <Avatar src={userImg} />
                                                                </Col>
                                                                <Col xs={17} sm={17} md={17} lg={17} xl={17} >
                                                                    <h4>{item.name}</h4>
                                                                    <h5>Develpoer</h5>
                                                                </Col>
                                                            </Row>
                                                        </footer>
                                                    </Card>
                                                </Col>
                                            )
                                        })}
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={24} sm={24} md={5} lg={5} xl={5} push={1} className='right-container'>
                            <Row>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                    <Link to={{ pathname: "/interviewerprofile", }}>
                                        <button id='similar' >SEE SIMILAR PROFILES   <i><ArrowRightOutlined /></i></button>
                                    </Link>
                                </Col>
                            </Row>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <div className='available-conatiner'>
                                    <h4 className='sloats'>Available Slots<Badge
                                        className="site-badge-count-109"
                                        count={slots.length}
                                    /></h4>
                                    {slots.map(item => {
                                        return (
                                            <div className={item.id == selectItemId ? 'sloat-select' : 'available-head'} onClick={() => handleClickSloat(item)}>
                                                <div className='available-slots'>
                                                    <h3>{moment(item.date).format('DD MMM YYYY')} </h3>
                                                    <h4>{item.time} IST</h4>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>

                                <button onClick={showConfirm} id='booknow' >Book now   <i><ArrowRightOutlined /></i></button>

                            </Col>

                        </Col>
                    </Row>
                </div>
            }
        </div>
    );

};

export default InterviewProfile;
