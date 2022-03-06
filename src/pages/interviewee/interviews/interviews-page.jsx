import React, { useState, useEffect } from 'react';
import './interviews-page.scss';
import 'antd/dist/antd.css';
import { Row, Col, Button, Input, Space, Card, Select, Rate, Avatar, Image } from 'antd';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


import seimag from '../../../../src/assets/imges/c-se.svg';
import fullstack from '../../../../src/assets/imges/c-full-stack.svg';

import apiService from "../../../utils/apiService";
import moment from 'moment';

const Interviews = () => {
    const jwt = localStorage.getItem('jwt');

    const { Search } = Input;
    const { Meta } = Card;
    const { Option } = Select;

    const [completedInterviewsList, setCompletedInterviewsList] = useState([]);
    const [scheduledInterviewsList, setScheduledInterviewsList] = useState([]);
    const [interviewFilterDataTypes, setInterviewFilterDataTypes] = useState([]);
    const [interviewFilterDataCompany, setInterviewFilterDataCompany] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [skillSelectId, setskillSelectId] = useState("");
    const [companySelectName, setcompanySelectName] = useState("");
    useEffect(() => {
        getMyInterviewsList(skillSelectId, companySelectName,);
        getFilterData();
        getFilterCompany();
    }, []);


    const getMyInterviewsList = (skillSelectId, companySelectName,) => {
        var apiUrl = `myinterviews/list?skillId=&companyName=`;
        if (skillSelectId != "") {
            apiUrl = "myinterviews/list?skillId=" + skillSelectId + "&companyName=";
        } if (skillSelectId == "" && companySelectName != "") {
            apiUrl = "myinterviews/list?skillId=&companyName=" + companySelectName;
        }
        if (skillSelectId != "" && companySelectName != "") {
            apiUrl = "myinterviews/list?skillId=" + skillSelectId + "&companyName=" + companySelectName;
        }
        apiService(apiUrl, 'get', '', false, jwt,
            result => {
                if (result.data) {
                    setScheduledInterviewsList([...result.data]);
                    // setCompletedInterviewsList([...result.data]);
                    setIsLoading(true)
                }
            },
            (error) => {

            });
    };

    const getFilterCompany = () => {
        apiService(`users/companyname`, 'get', '', false, jwt,
            result => {
                if (result.data) {
                    // setFilterCompanyList([...result.data.company]);
                    setInterviewFilterDataCompany([...result.data]);
                    // setFilterExperienceList([...result.data.experience]);
                    console.log(result.data)
                }
            },
            (error) => {

            });
    };

    const getFilterData = () => {
        apiService(`signup/skilllist`, 'get', '', false, jwt,
            result => {
                if (result.data) {
                    // setInterviewFilterDataCompany([...result.data.company]);
                    setInterviewFilterDataTypes([...result.data]);
                }
            },
            (error) => {

            });
    };

    function handleOnChangeSkill(value) {
        console.log(value)
        setIsLoading(false);
        setskillSelectId(value);
        getMyInterviewsList(value, companySelectName);
    }
    function handleOnChangeComapny(value) {
        console.log(value)
        setIsLoading(false)
        setcompanySelectName(value);
        getMyInterviewsList(skillSelectId, value);
    }


    return (
        <div className="interview_page_container p_10">
            <div className='interview-container'>
                <div className='interview-title'>
                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <h2>My Interviews</h2>
                        </Col>
                    </Row>
                </div>
                <div className='interview-search'>
                    <Row>
                        <Col xs={24} sm={24} md={1} lg={1} xl={1}>
                            <span class="material-icons">filter_alt</span>
                        </Col>
                        <Col xs={24} sm={24} md={5} lg={5} xl={5}>
                            <Select
                                showSearch
                                style={{ width: '100%' }}
                                placeholder="SEARCH COMPANY"
                                optionFilterProp="children"
                                onChange={handleOnChangeComapny}
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                filterSort={(optionA, optionB) =>
                                    optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                }
                            >
                                {/* {interviewFilterDataCompany.map(item => {
                                    return (<Option value="1">{item.value}</Option>)
                                })} */}
                                {interviewFilterDataCompany.map(item => {
                                    return (<Option value={item.companyname}>{item.companyname}</Option>)
                                })}
                            </Select>
                            {/* <Search placeholder="SEARCH SKILL" /> */}
                        </Col>
                        <Col xs={24} sm={24} md={5} lg={5} xl={5} push={1}>
                            <Select
                                showSearch
                                style={{ width: '100%' }}
                                placeholder="SEARCH SKILL"
                                optionFilterProp="children"
                                onChange={handleOnChangeSkill}
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                filterSort={(optionA, optionB) =>
                                    optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                }
                            >
                                {interviewFilterDataTypes.map(item => {
                                    return (<Option value={item.id}>{item.name}</Option>)
                                })}
                                {/* <Option value="1">TCS</Option>
                                <Option value="2">Amazon</Option>
                                <Option value="3">Paypal</Option> */}
                            </Select>
                        </Col>
                        {/* <Col xs={24} sm={24} md={7} lg={7} xl={7} push={5}>
                            <Search placeholder="SEARCH INTERVIEWS" />
                        </Col> */}
                    </Row>
                </div>
                <div className='interview-schedule'>
                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <h3>Schedule Interviews</h3>
                        </Col>
                    </Row>
                    <div className='interview-card'>
                        {isLoading == false ?
                            <Row>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                                    <div class="wrapper">
                                        <div class="card-loader card-loader--tabs"></div>
                                    </div>
                                </Col>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                                    <div class="wrapper">
                                        <div class="card-loader card-loader--tabs"></div>
                                    </div>
                                </Col>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                                    <div class="wrapper">
                                        <div class="card-loader card-loader--tabs"></div>
                                    </div>
                                </Col>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                                    <div class="wrapper">
                                        <div class="card-loader card-loader--tabs"></div>
                                    </div>
                                </Col>
                            </Row> :
                            <Row>
                                {scheduledInterviewsList.length == 0 ?
                                    // <LottieComponent file={LottieFile.NoData} width={'50%'} />
                                    <div>
                                        <h3 className='interview-company'>No Data</h3>
                                    </div>
                                    :
                                    scheduledInterviewsList.map(item => {
                                        return (
                                            <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                                                <Link to={{ pathname: "/scheduledinterview", state: { data: item } }}>
                                                    <Card hoverable cover={<img alt="example" src={fullstack} />}>
                                                        <Row>
                                                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                                <div>
                                                                    <h3 className='interview-company'>{item.companyname}</h3>
                                                                    <h3>{item.level}</h3>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col xs={24} sm={24} md={24} lg={24} xl={24} push={11}>

                                                                <h4> {moment(item.date).format('DD MMM')} {item.time}</h4>
                                                            </Col>
                                                        </Row>
                                                    </Card>
                                                </Link>
                                            </Col>
                                        )
                                    })}
                            </Row>
                        }
                    </div>
                </div>
                <div className='interview-completed'>
                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <h3>Completed Interviews</h3>
                        </Col>
                    </Row>
                    <div className='interview-card'>
                        {isLoading == false ?
                            <Row>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                                    <div class="wrapper">
                                        <div class="card-loader card-loader--tabs"></div>
                                    </div>
                                </Col>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                                    <div class="wrapper">
                                        <div class="card-loader card-loader--tabs"></div>
                                    </div>
                                </Col>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                                    <div class="wrapper">
                                        <div class="card-loader card-loader--tabs"></div>
                                    </div>
                                </Col>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                                    <div class="wrapper">
                                        <div class="card-loader card-loader--tabs"></div>
                                    </div>
                                </Col>
                            </Row> :
                            <Row>
                                {completedInterviewsList.map(item => {
                                    return (
                                        <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                                            <Link to={{ pathname: "/scheduledInterview", state: { fullstack } }}>
                                                <Card hoverable cover={<img alt="example" src={seimag} />}>
                                                    <Row>
                                                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                            <div>
                                                                <h3 className='interview-company'>{item.company}</h3>
                                                                <h3>{item.name}</h3>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col xs={24} sm={24} md={24} lg={24} xl={24} push={7}>
                                                            <h5>{item.datetime}</h5>
                                                        </Col>
                                                    </Row>
                                                </Card>
                                            </Link>
                                        </Col>
                                    )
                                })}
                            </Row>
                        }
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Interviews;
