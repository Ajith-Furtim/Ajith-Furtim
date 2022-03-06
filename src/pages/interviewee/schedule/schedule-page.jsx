import React, { useState, useEffect } from 'react';
import './schedule-page.scss';
import 'antd/dist/antd.css';
import { Row, Col, Button, Input, Space, Card, Select, Rate, Avatar, Image, Skeleton } from 'antd';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { ArrowRightOutlined, AudioOutlined } from '@ant-design/icons';

import apiService from "../../../utils/apiService";

import userImg from '../../../../src/assets/imges/user.png';
const Schedule = () => {
    const jwt = localStorage.getItem('jwt');
    const userId = localStorage.getItem('userId');
    const { Search } = Input;
    const { Meta } = Card;
    const { Option } = Select;
    const [scheduleList, setScheduleList] = useState([]);
    const [filterSkillList, setFilterSkillList] = useState([]);
    const [filterCompanyList, setFilterCompanyList] = useState([]);
    const [filterExperienceList, setFilterExperienceList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


    const [skillSelectId, setskillSelectId] = useState("");
    const [companySelectName, setcompanySelectName] = useState("");
    const [experienceSelect, setexperienceSelect] = useState("");
    const [ratingSelect, setratingSelect] = useState("");



    useEffect(() => {
        getScheduleList(skillSelectId, companySelectName, experienceSelect, ratingSelect);
        getFilterData();
        getFilterCompany();
    }, []);


    const getScheduleList = (skillSelectId, companySelectName, experienceSelect, ratingSelect) => {

        var apiUrl = `myinterviews/favlist?skillId=&companyName=&experience=&rating=`;
        if (skillSelectId != "") {
            apiUrl = "myinterviews/favlist?skillId=" + skillSelectId + "&companyName=&experience=&rating=";
        } if (skillSelectId == "" && companySelectName != "") {
            apiUrl = "myinterviews/favlist?skillId=&companyName=" + companySelectName + "&experience=&rating=";
        } if (skillSelectId == "" && companySelectName == "" && experienceSelect != "") {
            apiUrl = "myinterviews/favlist?skillId=&companyName=&experience=" + experienceSelect + "&rating=";
        } if (skillSelectId != "" && companySelectName != "" && experienceSelect != "") {
            apiUrl = "myinterviews/favlist?skillId=" + skillSelectId + "&companyName=" + companySelectName + "&experience=" + experienceSelect + "&rating=";
        } if (skillSelectId != "" && companySelectName != "" && experienceSelect == "") {
            apiUrl = "myinterviews/favlist?skillId=" + skillSelectId + "&companyName=" + companySelectName + "&experience=&rating=";
        } if (skillSelectId != "" && companySelectName == "" && experienceSelect != "") {
            apiUrl = "myinterviews/favlist?skillId" + skillSelectId + "=&companyName=&experience=" + experienceSelect + "&rating=";
        } if (skillSelectId == "" && companySelectName != "" && experienceSelect != "") {
            apiUrl = "myinterviews/favlist?skillId=&companyName=" + companySelectName + "&experience=" + experienceSelect + "&rating=";
        }
        apiService(apiUrl, 'get', '', false, jwt,
            result => {
                if (result.data) {
                    setScheduleList([...result.data]);
                    setIsLoading(true)
                }
            },
            (error) => {

            });
    };

    const getFilterData = () => {
        apiService(`signup/skilllist`, 'get', '', false, jwt,
            result => {
                if (result.data) {
                    // setFilterCompanyList([...result.data.company]);
                    setFilterSkillList([...result.data]);
                    // setFilterExperienceList([...result.data.experience]);
                    console.log(result.data)
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
                    setFilterCompanyList([...result.data]);
                    setFilterExperienceList([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
                    console.log(result.data)
                }
            },
            (error) => {

            });
    };
    function handleOnChangeSkill(value) {
        console.log(value)
        setIsLoading(false);
        setskillSelectId(value);
        getScheduleList(value, companySelectName, experienceSelect, ratingSelect);
    }
    function handleOnChangeComapny(value) {
        console.log(value)
        setIsLoading(false)
        setcompanySelectName(value);
        getScheduleList(skillSelectId, value, experienceSelect, ratingSelect);
    }
    function handleOnChangeExperience(value) {
        console.log(value)
        setIsLoading(false)
        setexperienceSelect(value);
        getScheduleList(skillSelectId, companySelectName, value, ratingSelect);
    }
    function handleOnChangeRating(value) {
        console.log(value)
        setIsLoading(false)
        setratingSelect(value);
        getScheduleList(skillSelectId, companySelectName, experienceSelect, value);
    }


    return (

        <div className="schedule_page_container p_10">
            <div className='schedule-container'>
                <div className='schedule-search'>
                    <Row>
                        <Col xs={24} sm={24} md={1} lg={1} xl={1}>
                            <span class="material-icons">filter_alt</span>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6}>
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
                                {filterSkillList.map(item => {
                                    return (<Option value={item.id}>{item.name}</Option>)
                                })}
                            </Select>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} push={1}>
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
                                {filterCompanyList.map(item => {
                                    return (<Option value={item.companyname}>{item.companyname}</Option>)
                                })}
                            </Select>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} push={2}>
                            <Select
                                showSearch
                                style={{ width: '100%' }}
                                placeholder="SEARCH EXPERIENCE"
                                optionFilterProp="children"
                                onChange={handleOnChangeExperience}
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                filterSort={(optionA, optionB) =>
                                    optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                }
                            >
                                {filterExperienceList.map(item => {
                                    return (<Option value={item}>{item}</Option>)
                                })}
                            </Select>
                            {/* <Search placeholder="SEARCH EXPERIENCE" style={{ width: 250 }} /> */}
                        </Col>
                        {/* <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                            <Search placeholder="SEARCH RATING" style={{ width: 250 }} />
                        </Col> */}
                    </Row>
                </div>
                <div className='schedule-head'>
                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <h2>Schedule your discussions with skilled consultants</h2>
                        </Col>
                    </Row>
                    <div className='schedule-card'>
                        {isLoading == false ?
                            <Row>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <div class="wrapper">
                                        <div class="card-loader card-loader--tabs"></div>
                                    </div>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <div class="wrapper">
                                        <div class="card-loader card-loader--tabs"></div>
                                    </div>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <div class="wrapper">
                                        <div class="card-loader card-loader--tabs"></div>
                                    </div>
                                </Col>
                            </Row> :
                            <Row>
                                {scheduleList.length == 0 ?
                                    <LottieComponent file={LottieFile.NoData} width={'50%'} />
                                    :
                                    scheduleList.map(item => {
                                        return (
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Card hoverable style={{ width: 340, marginTop: 16, height: 320 }}>
                                                    <div class='card-header'>
                                                        <Row>
                                                            <Col xs={15} sm={15} md={15} lg={15} xl={15}>
                                                                <div>
                                                                    <h2>{item.firstName} {item.lastName}</h2>
                                                                    <h3>{item.interviewerInfo.companyName}</h3>
                                                                </div>
                                                            </Col>
                                                            <Col xs={9} sm={9} md={9} lg={9} xl={9}>
                                                                <Avatar src={userImg} />
                                                                <i><Rate disabled defaultValue={item.interviewerInfo.overAllRating} /></i>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                    <Meta
                                                        description={item.interviewerInfo.description}
                                                    />
                                                    <footer>
                                                        <Row >
                                                            <Col xs={12} sm={12} md={12} lg={12} xl={12} push={10}>
                                                                <div > <Link to={{ pathname: "/interviewerprofile", state: { data: item } }}><button id='resend' >SCHEDULE   <i><ArrowRightOutlined /></i></button></Link></div>
                                                            </Col>
                                                        </Row>
                                                    </footer>
                                                </Card>
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

export default Schedule;
