import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import './scheduledInterview-page.scss';
import 'antd/dist/antd.css';
import { Row, Col, Button, Input, Space, Card, Select, Rate, Avatar, Image, Steps, Modal } from 'antd';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { ArrowRightOutlined, AudioOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

import fullstack from '../../../../src/assets/imges/c-full-stack.svg';
import apiService from "../../../utils/apiService";
import moment from 'moment';



const ScheduledInterview = () => {
    let data = useLocation();
    const history = useHistory();
    const jwt = localStorage.getItem('jwt');

    let interviewrData = data.state.data;
    const { confirm } = Modal;

    const { Search } = Input;
    const { Meta } = Card;
    const { Option } = Select;
    const { Step } = Steps;

    const [similarList, setSimilarList] = useState([]);
    const [paymetStatus, setPaymetStatus] = useState("");
    const [joinNowTrue, setJoinNowTrue] = useState(false);
    const [todayDate, setTodayDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
    const [assigendStatus, setassigendStatus] = useState(3);


    useEffect(() => {
        var date1 = new Date(todayDate);
        var date2 = new Date(interviewrData.date);
        console.log(date1)
        console.log(date2)
        if (date1.getTime() === date2.getTime()) {
            setJoinNowTrue(true);
            // var todayTime = moment(new Date()).format("H:mm:ss");
            // var str1 = todayTime;
            // var str2 = interviewrData.time;

            // if (str1 > str2) {
            //     setJoinNowTrue(true)
            // }
        }
        // getAllStatus();
        if (interviewrData.status == "INTERVIEWER ASSIGNED") {
            setassigendStatus(1);
        } else if (interviewrData.status == "PAYMENT COMPLETED") {
            setassigendStatus(2);
        } else if (interviewrData.status == "SYSTEM CHECK") {
            setassigendStatus(3);
        } else if (interviewrData.status == "PREP TEST") {
            setassigendStatus(4);
        } else if (interviewrData.status == "BEGIN INTERVIEW") {
            setassigendStatus(5);
        }
    }, []);


    const getAllStatus = () => {
        apiService(`users/statuslist`, 'get', '', false, jwt,
            result => {
                if (result.data) {
                    console.log(result.data)
                }
            },
            (error) => {

            });
    };

    const openZoom = () => {
        var url = interviewrData.joiurl;
        window.open(url, 'popUpWindow', 'height=500,width=500,left=400,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes')
        // window.parent.location.href = "https://us05web.zoom.us/s/83800033458?zak=eyJ0eXAiOiJKV1QiLCJzdiI6IjAwMDAwMSIsInptX3NrbSI6InptX28ybSIsImFsZyI6IkhTMjU2In0.eyJhdWQiOiJjbGllbnRzbSIsInVpZCI6InFjdkg3ZGhfVHBhWkFYM01vdG43Y1EiLCJpc3MiOiJ3ZWIiLCJzayI6IjAiLCJzdHkiOjEsIndjZCI6InVzMDUiLCJjbHQiOjAsIm1udW0iOiI4MzgwMDAzMzQ1OCIsImV4cCI6MTY0NTYzMTU1MiwiaWF0IjoxNjQ1NjI0MzUyLCJhaWQiOiJleFJ4ZTJ5YlM1V0RVNlN5VVgzY253IiwiY2lkIjoiIn0.-TuGqW__sSFndtYjofCQsLZDgkowWLKgiR3EoR5OCkU";

    };

    function showConfirm() {
        confirm({
            title: 'Do you want to interview cancel?',
            icon: <ExclamationCircleOutlined />,
            // content: 'Some descriptions',
            onOk() {
                history.push({ pathname: '/cancelinterview', state: { data: interviewrData } });

            },
            onCancel() {
            },
        });
    }


    function showConfirmRe() {
        confirm({
            title: 'Do you want to reschedule interview?',
            icon: <ExclamationCircleOutlined />,
            // content: 'Some descriptions',
            onOk() {
                history.push({ pathname: '/rescheduledinterview', state: { data: interviewrData } });

            },
            onCancel() {
            },
        });
    }

    return (
        <div className="scheduledInterview_page_container p_10">
            <div className='scheduledInterview-container'>
                <div className='scheduledInterview-title'>
                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <h2>ScheduledInterview | {interviewrData.companyname} | {moment(interviewrData.date).format('DD MMM')} {interviewrData.time}</h2>
                        </Col>
                    </Row>
                </div>
                <div className='scheduledInterview-status'>
                    <Row>
                        <Col xs={24} sm={24} md={3} lg={3} xl={3}>
                            <img alt="example" src={fullstack} />
                        </Col>
                        <Col xs={24} sm={24} md={2} lg={2} xl={2} push={1}>
                            <div className="assigned-details">
                                <h4>{interviewrData.companyname}</h4>
                                {/* <h2>{interviewrData.level}</h2> */}
                                <h5>Interviewer Mr.{interviewrData.firstname} {interviewrData.lastname} has been assigned</h5>
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={13} lg={13} xl={13} push={1}>
                            <div className='stpes-completed-large'>
                                <Steps size="small" current={assigendStatus}>
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
                                <Steps size="small" direction="vertical" current={assigendStatus}>
                                    <Step description="INTERVIEWER ASSIGNED" />
                                    <Step description="PAYMENT COMPLETED" />
                                    <Step description="SYSTEM CHECK" />
                                    <Step description="PREP TEST" />
                                    <Step description="BEGIN INTERVIEW" />
                                </Steps>
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={3} lg={3} xl={3} push={1}>
                            <div className='btn-div'>
                                {joinNowTrue == false ?
                                    <Row>
                                        <Col xs={12} sm={12} md={24} lg={24} xl={24}>
                                            <button id='resend' onClick={showConfirmRe}>RE SCHEDULE   <i><ArrowRightOutlined /></i></button>
                                        </Col>
                                        <Col xs={12} sm={12} md={24} lg={24} xl={24}>
                                            <div ><button onClick={showConfirm} id='cancel' >cancel  <i><ArrowRightOutlined /></i></button></div>
                                        </Col>
                                    </Row> :
                                    <Row>
                                        <Col xs={12} sm={12} md={24} lg={24} xl={24}>
                                            <button id='resend' onClick={openZoom}>Join Now   <i><ArrowRightOutlined /></i></button>
                                        </Col>
                                    </Row>
                                }
                            </div>
                        </Col>
                    </Row>
                </div>
                {/* <div className='similar-interviews'>
                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <h2>Watch Similar Interviews</h2>
                        </Col>
                        {similarList.map(item => {
                            return (
                                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                    <Card className='video-card'>
                                        <Row>
                                            <Col xs={12} sm={12} md={14} lg={14} xl={14}>
                                                <div>
                                                    <h3>{item.company}</h3>
                                                </div>
                                            </Col>
                                            <Col xs={12} sm={12} md={10} lg={10} xl={10} push={6}>
                                                <h5>VIEW MORE <i><ArrowRightOutlined /></i></h5>
                                            </Col>
                                        </Row>
                                        <ReactPlayer controls url='https://www.youtube.com/watch?v=ysz5S6PUM-U'
                                            className='react-player' />
                                        <div className='video-rate'>
                                            <Row>
                                                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                                    <div>
                                                        <i><Rate disabled defaultValue={item.rating} /></i>
                                                    </div>
                                                </Col>
                                                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                                    <h3>{item.skill}</h3>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Card>

                                </Col>
                            )
                        })}                       
                    </Row>
                </div> */}
            </div>
        </div>
    );

};

export default ScheduledInterview;
