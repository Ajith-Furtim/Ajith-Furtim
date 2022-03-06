import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Card, Spin } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';
import './programmingLanguages-page.scss';
import 'antd/dist/antd.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { ArrowRightOutlined, UserOutlined, CheckCircleTwoTone } from '@ant-design/icons';
import apiService from "../../../utils/apiService";
import Notification from "../../../components/notification/notification";



import lanImg from '../../../../src/assets/imges/langnew.png';
const menus = [
    {
        icon: <ArrowRightOutlined />,
    }
];
const { Meta } = Card;

const ProgrammingLanguages = () => {
    const location = useLocation();
    let yourself = location.state.yourself;
    const jwt = localStorage.getItem('jwt');
    const [programmingList, setProgrammingList] = useState([]);
    const [selectItemId, setSelectItemId] = useState("");
    const [isLoading, setIsLoading] = useState(false);



    useEffect(() => {
        getProgrammingList();
    }, []);


    const getProgrammingList = () => {
        apiService(`signup/pllist`, 'get', '', false, jwt,
            result => {
                if (result.data) {
                    setProgrammingList([...result.data]);
                    setIsLoading(true);
                }
            },
            (error) => {
            });
    };

    const handleSubmit = () => {
        if (selectItemId != "") {
            const programminglanguages = {
                userLang: [{
                    id: selectItemId
                }
                ],
            }
            Notification.openNotificationSuccess("Details updated!")
            history.push({ pathname: '/yourskill', state: { yourself: yourself, programminglanguages: programminglanguages } });
        } else {
            Notification.openNotificationFaliure("Pick one more programming languages that you are comfortable!")

        }

    };


    const handleClick = (value) => {
        setSelectItemId(value.id);

    }

    const history = useHistory();
    return (
        <div className="programming_page_container">
            {isLoading == false ?
                <div className="spinner">
                    <Spin />
                </div> :
                <div class='programming-container'>

                    <div class='left-container'>
                        <header>

                            <div class='card'>
                                <div class="header-name">
                                    <Row>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                            <h2>Programming Languages</h2>
                                        </Col>
                                    </Row>
                                </div>
                                <div class="header-name">
                                    <Row>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                            <h4>Pick one more programming languages that you are comfortable </h4>
                                        </Col>
                                    </Row>
                                </div>
                                <div class='set'>
                                    <Row>
                                        {programmingList.map(item => {
                                            return (
                                                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                                    <Card className={item.id == selectItemId ? 'ant-card-select' : ''} style={{ width: 280, marginTop: 16, height: 60 }} onClick={() => handleClick(item)}>
                                                        <Row>
                                                            <Col xs={24} sm={24} md={24} lg={24} xl={24} push={13}>
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
                                            <Link to="/yourself"> <Button type="back" icon={<ArrowRightOutlined />} size="large">BACK </Button></Link>
                                            <Button onClick={handleSubmit} htmlType="submit" type="primary" icon={<ArrowRightOutlined />} size="large">NEXT STEP </Button>
                                        </div>
                                    </footer>
                                </div>


                            </div>



                        </header>
                        {/* <footer>
                                    <div class=''>
                                        <Row >
                                            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                                <Link to="/yourself"><button id='resend'>BACK   <i><ArrowRightOutlined /></i></button></Link>
                                            </Col>
                                            <Col xs={12} sm={12} md={12} lg={12} xl={12} push={1}>
                                                <button onClick={handleSubmit} id='next'>NEXT STEP   <i><ArrowRightOutlined /></i></button>
                                            </Col>
                                        </Row>
                                    </div>
                                </footer> */}
                    </div>
                    <div class='right-container'>
                        <h1>May be a good idea to have skill on more than one languages - Object oriented vs Functional </h1>
                        <img src={lanImg} />
                    </div>

                </div>
            }

        </div>
    );
};

export default ProgrammingLanguages;