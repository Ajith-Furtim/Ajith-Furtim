import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Card, Spin } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './yourskill-page.scss';
import 'antd/dist/antd.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { ArrowRightOutlined, UserOutlined, CheckCircleTwoTone } from '@ant-design/icons';
import apiService from "../../../utils/apiService";
import Notification from "../../../components/notification/notification";



import otpImg from '../../../../src/assets/imges/yourskillnew.png';
const menus = [
    {
        icon: <ArrowRightOutlined />,
    }
];




const { Meta } = Card;

const YourSkill = () => {
    const history = useHistory();
    const location = useLocation();
    let yourself = location.state.yourself;
    let programminglanguages = location.state.programminglanguages;
    console.log(yourself);
    console.log(programminglanguages);
    const jwt = localStorage.getItem('jwt');
    const dispatch = useDispatch();
    const [skillList, setSkillList] = useState([]);
    const [selectItemId, setSelectItemId] = useState("");
    const [isLoading, setIsLoading] = useState(false);



    useEffect(() => {
        getSkillList();
    }, []);


    const getSkillList = () => {
        apiService(`signup/skilllist`, 'get', '', false, jwt,
            result => {
                if (result.data) {
                    setSkillList([...result.data]);
                    setIsLoading(true);
                }
            },
            (error) => {

            });
    };


    const handleSubmit = () => {
        if (selectItemId != "") {
            const userSkills = {
                userSkills: [{
                    id: selectItemId
                }
                ],
            }
            Notification.openNotificationSuccess("Details updated!")
            history.push({ pathname: '/interestarea', state: { yourself: yourself, programminglanguages: programminglanguages, userSkills: userSkills } });
        } else {
            Notification.openNotificationFaliure("Pick one more skills that you possess!")

        }

    };

    const handleClick = (value) => {
        setSelectItemId(value.id);

    }

    return (
        <div className="yourskill_page_container">
            {isLoading == false ?
                <div className="spinner">
                    <Spin />
                </div> :
                <div class='yourskill-container'>
                    <div class='left-container'>
                        <header>
                            <div class="header-name">
                                <Row>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <h2>Your Skill / Expertise </h2>
                                    </Col>
                                </Row>
                            </div>
                            <div class="header-name">
                                <Row>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <h4>Pick one more skills that you possess </h4>
                                    </Col>
                                </Row>
                            </div>
                            <div class='card'>

                                <Row>
                                    {skillList.map(item => {
                                        return (
                                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                                <Card className={item.id == selectItemId ? 'ant-card-select' : ''} onClick={() => handleClick(item)}>
                                                    <Row>
                                                        <Col xs={24} sm={24} md={24} lg={24} xl={24} push={15}>
                                                            {item.id == selectItemId ?
                                                                <i > <CheckCircleTwoTone twoToneColor="#52c41a" /></i>
                                                                : null}
                                                        </Col>
                                                    </Row>
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
                                        <Link to="/programminglanguages"> <Button type="back" icon={<ArrowRightOutlined />} size="large">BACK </Button></Link>
                                        <Button onClick={handleSubmit} htmlType="submit" type="primary" icon={<ArrowRightOutlined />} size="large">NEXT STEP </Button>
                                    </div>
                                </footer>
                            </div>

                        </header>
                        {/* <footer>
                            <div class=''>
                                <Row >
                                    <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                        <Link to="/programminglanguages"><button id='resend'>BACK   <i><ArrowRightOutlined /></i></button></Link>
                                    </Col>
                                    <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                        <button id='next' onClick={handleSubmit}>NEXT STEP   <i><ArrowRightOutlined /></i></button>
                                    </Col>
                                </Row>
                            </div>
                        </footer> */}
                    </div>
                    <div class='right-container'>
                        <h1>A degree can just earn the job, but t cannot help to grow further without the skill</h1>
                        <img src={otpImg} />
                    </div>
                </div>
            }
        </div>
    );
};

export default YourSkill;