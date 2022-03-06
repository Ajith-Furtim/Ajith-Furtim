import './interviewee-details.scss';
import { Button, Table, } from 'antd';
import { DatePicker } from 'antd';
import { Modal, Spin } from 'antd';
import { TimePicker } from 'antd';
import moment from 'moment';
import { Row, Col } from 'antd';
import apiService from "../../../utils/apiService";
import React, { useState, useEffect } from 'react';



const IntervieweeDetails = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const jwt = localStorage.getItem('jwt');
    const [userList, setUserList] = useState([]);
    const { Column, ColumnGroup } = Table;
    const [dataSource, setdataSource] = useState([]);




    const showModal = () => {
        console.log("test")
        setIsModalVisible({ isModalVisible: true });
    };
    const handleOk = () => {
        setIsModalVisible(false);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };


    useEffect(() => {
        getInterviewee();
    }, []);


    const getInterviewee = () => {
        apiService(`users/userslist/2`, 'get', '', false, jwt,
            result => {
                if (result.data) {
                    setUserList([...result.data]);
                    const resultPush = [];
                    result.data.map(data => {
                        resultPush.push({
                            key: data.id,
                            email: data.email,
                            name: data.firstname + " " + data.lastname,

                        });
                    });
                    setdataSource(resultPush);
                    setIsLoading(true);
                }
            },
            (error) => {
            });
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Action',
            dataIndex: 'Action',
            key: 'Action',
        },
    ];
    return (


        <div className="interviewer_page p_10">
            {isLoading == false ?
                <div className="spinner">
                    <Spin />
                </div> :
                <div>
                    <div className='btn'>
                        <Button type="primary" onClick={showModal}></Button>
                        Link
                    </div>
                    <Modal title="Slot" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                        <Row>
                            <Col span={12}>
                                <h3 className='text'>DatePicker</h3>
                                <DatePicker
                                    dateRender={current => {
                                        const style = {};
                                        if (current.date() === 1) {
                                            style.border = '1px solid #1890ff';
                                            style.borderRadius = '50%';
                                        }
                                        return (
                                            <div className="ant-picker-cell-inner" style={style} >
                                                {current.date()}
                                            </div>
                                        );
                                    }}
                                /></Col>
                            <Col span={12}>
                                <h3 className='text'>Add Slot</h3>
                                <TimePicker defaultValue={moment('00:00:00', 'HH:mm:ss')} />
                            </Col>
                        </Row>
                    </Modal>
                    <div className='interview-container'>
                        <div className="App">
                        </div>
                        <div>
                            <Table dataSource={dataSource} columns={columns} />
                        </div>
                    </div>
                </div>
            }
        </div>
    );

}

export default IntervieweeDetails;
