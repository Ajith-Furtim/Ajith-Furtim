import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Card, Result, Spin } from 'antd';
import { Link, NavLink, useHistory, useLocation } from 'react-router-dom';

import './interestArea-page.scss';
import 'antd/dist/antd.css';
import { ArrowRightOutlined, UserOutlined, CheckCircleTwoTone } from '@ant-design/icons';
import apiService from "../../../utils/apiService";
import Notification from "../../../components/notification/notification";



import linkareaimg from '../../../../src/assets/imges/likeareanew.png';
const menus = [
    {
        icon: <ArrowRightOutlined />,
    }
];
const { Meta } = Card;

const InterestArea = () => {
    const history = useHistory();
    const location = useLocation();
    let yourself = location.state.yourself;
    let programminglanguages = location.state.programminglanguages;
    let userLang = programminglanguages.userLang;
    let userSkillsVa = location.state.userSkills;
    let userSkills = userSkillsVa.userSkills;
    console.log(yourself);
    console.log(userLang);
    console.log(userSkills);
    const jwt = localStorage.getItem('jwt');

    const [interestAreaList, setInterestAreaList] = useState([]);
    const [selectItemId, setSelectItemId] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isBtnLoading, setisBtnLoading] = useState(false);




    useEffect(() => {
        getInterestAreaList();
    }, []);


    const getInterestAreaList = () => {
        apiService(`signup/favlist`, 'get', '', false, jwt,
            result => {
                if (result.data) {
                    setInterestAreaList([...result.data]);
                    setIsLoading(true);
                }
            },
            (error) => {
            });
    };

    const handleSubmit = () => {
        if (selectItemId != "") {
            setisBtnLoading(true);
            apiService(`onboarding/userdetails`, 'post', {
                "isStudent": yourself.isStudent,
                "degree": yourself.degree,
                "specialization": yourself.specialization,
                "graduationYear": yourself.graduationYear,
                "collegeInfoDto": {
                    "cgpa": yourself.collegeInfoDto.cgpa,
                    "collegeName": yourself.collegeInfoDto.collegeName
                },
                userLang,
                userSkills,
                userDomain: [{
                    id: selectItemId
                }
                ]

            }, false, jwt,
                result => {
                    if (result.data.message == "Welcome to our platform") {
                        setisBtnLoading(false);
                        Notification.openNotificationSuccess(result.data.message)
                        history.push('/login');

                    } else {
                        setisBtnLoading(false);
                        Notification.openNotificationSuccess(result.data.message)
                    }
                },
                (error) => {

                });
        } else {
            Notification.openNotificationFaliure("Prefer to choose your most skilled option out this listed!")

        }
    };


    const handleClickCard = (value) => {
        setSelectItemId(value.id);

    }




    const handleClick = () => {
        history.push('/login');
        // // localStorage.setItem('login', true);
        // // this.props.navigation.navigate("/Dashboard", { login: true });
        // this.setState({ signupSuccess: true });
    }
    return (
        <div className="interestArea_page_container">
            {isLoading == false ?
                <div className="spinner">
                    <Spin />
                </div> :
                <div class='interestArea-container'>
                    <div class='left-container'>
                        <header>
                            <div class="header-name">
                                <Row>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <h2>Area you like to be interviewed?</h2>
                                    </Col>
                                </Row>
                            </div>
                            <div class="header-name">
                                <Row>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <h4>Prefer to choose your most skilled option out this listed</h4>
                                    </Col>
                                </Row>
                            </div>
                            <div class='card'>
                                <Row>
                                    {interestAreaList.map(item => {
                                        return (
                                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                                <Card className={item.id == selectItemId ? 'ant-card-select' : ''} style={{ width: 252, marginTop: 16, height: 70 }} onClick={() => handleClickCard(item)}>
                                                    <div>
                                                        <Row>
                                                            <Col xs={24} sm={24} md={24} lg={24} xl={24} push={15}>
                                                                {item.id == selectItemId ?
                                                                    <i > <CheckCircleTwoTone twoToneColor="#52c41a" /></i>
                                                                    : null}
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                    <Meta
                                                        description={item.name}
                                                    />
                                                </Card>
                                            </Col>
                                        )
                                    })
                                    }
                                </Row>

                                <footer>
                                    <div class='footer_details'>
                                        {!isBtnLoading && <Button onClick={handleSubmit} type="primary" icon={<ArrowRightOutlined />} size="large"> NEXT STEP </Button>}
                                        {isBtnLoading && <Button onClick={handleSubmit} type="primary" icon={<ArrowRightOutlined />} loading={isBtnLoading} size="large"> NEXT STEP </Button>}
                                    </div>
                                </footer>
                            </div>
                        </header>
                    </div>

                    <div class='right-container'>
                        <h1>May be a good idea to have skill on more than one languages - Object oriented vs Functional</h1>
                        <img src={linkareaimg} />
                    </div>

                </div>
            }
        </div>
    );

}

export default InterestArea;