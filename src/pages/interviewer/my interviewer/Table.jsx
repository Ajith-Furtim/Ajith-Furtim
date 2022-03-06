import './Table.scss';
import React, { useState, useEffect } from 'react';
import { DatePicker } from 'antd';
import { Modal } from 'antd';
import { TimePicker } from 'antd';
import moment from 'moment';
import { Row, Col, Select, Spin, Form } from 'antd';
import { Table, Tag, Space, Button } from 'antd';


import apiService from "../../../utils/apiService";
import Notification from "../../../components/notification/notification";

const Interviewer = () => {
    const jwt = localStorage.getItem('jwt');
    const userId = localStorage.getItem('userId');

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [date, setDate] = useState("");
    const [time, setTime] = useState([]);
    const [userList, setUserList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [dataSource, setdataSource] = useState([]);

    const [form] = Form.useForm();
    const { Column, ColumnGroup } = Table;




    const { Option } = Select;
    const showModal = () => {
        console.log("test")
        setIsModalVisible({ isModalVisible: true });
    };
    const handleOk = () => {
        setIsLoading(false);
        submit();
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const onChange = (date, dateString) => {
        setDate(moment(date).format('YYYY-MM-DD'));
    }


    useEffect(() => {
        getInterviewee();
    }, []);


    const getInterviewee = () => {
        apiService(`myinterview/schedulelist/` + userId, 'get', '', false, jwt,
            result => {
                if (result.data) {
                    const resultPush = [];
                    result.data.map(data => {
                        resultPush.push({
                            key: data.id,
                            date: data.date,
                            name: data.firstname + " " + data.lastname,
                            time: data.time,
                            status: data.status,
                            Action: [<Button type="primary" >JOIN NOW</Button>, <Button className='taken' type="primary" >TAKEN</Button>],

                        });
                    });
                    setdataSource(resultPush);
                    setIsLoading(true);
                }
            },
            (error) => {
            });
    };



    const handleSubmit = () => {
        console.log("test")

    }



    const submit = () => {
        apiService(`myinterview/schedule`, 'post', {
            "scheduleDto": [
                {
                    "scheduleDate": date,
                    "scheduleTime": time
                },
            ]
        }, false, jwt,
            result => {
                if (result.data.message) {
                    Notification.openNotificationSuccess(result.data.message)
                    setIsModalVisible(false);
                    setIsLoading(true);
                } else {
                    Notification.openNotificationFaliure(result.data.message)
                }
            },
            (error) => {

            });
    }
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },

        {
            title: 'Time',
            dataIndex: 'time',
            key: 'time',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },

        {
            title: 'Action',
            dataIndex: 'Action',
            key: 'Action',
        },
    ];
    return (
        <div className='interviewer_page'>
            {isLoading == false ?
                <div className="spinner">
                    <Spin />
                </div> :
                <div>
                    {/* <div className='btn'>
                        <Button type="primary" onClick={showModal}>Add Slot</Button>

                    </div> */}
                    <div className="interviewer_page_container p_10">

                        <Modal title="Add Slot" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                            <Form name="slot" form={form} onFinish={handleSubmit} layout="vertical">

                                <Row>
                                    <Col span={12}>
                                        <label >Select Date</label>
                                        <DatePicker onChange={onChange} />
                                    </Col>
                                    <Col span={12}>
                                        <label >Select Time</label>
                                        <Form.Item
                                            name="time"
                                            rules={[{ message: 'Please select time!', required: true }]}>
                                            <Select
                                                showSearch
                                                style={{ width: '100%' }}
                                                value={time} onChange={e => setTime(e)}
                                                placeholder="SELECT TIME"
                                                optionFilterProp="children"
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
                                                <Option value="01:00">01:00</Option>
                                                <Option value="02:00">02:00</Option>
                                                <Option value="03:00">03:00</Option>
                                                <Option value="04:00">04:00</Option>
                                                <Option value="05:00">05:00</Option>
                                                <Option value="06:00">06:00</Option>
                                                <Option value="07:00">07:00</Option>
                                                <Option value="08:00">08:00</Option>
                                                <Option value="09:00">09:00</Option>
                                                <Option value="10:00">10:00</Option>
                                                <Option value="11:00">12:00</Option>

                                            </Select>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form>

                        </Modal>

                        <div className='interview-container'>
                            <div className="App">
                            </div>
                            <div>
                                <Table dataSource={dataSource} columns={columns} />

                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );

}

export default Interviewer;
