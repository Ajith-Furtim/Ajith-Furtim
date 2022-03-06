import React, { useState, useEffect } from 'react';
import { DatePicker } from 'antd';
import { Modal } from 'antd';
import { TimePicker } from 'antd';
import moment from 'moment';
import { Row, Col, Select, Spin, Form, Pagination } from 'antd';
import { Table, Tag, Space, Button } from 'antd';


import apiService from "../../../utils/apiService";
import Notification from "../../../components/notification/notification";

const Interviews = () => {
    const jwt = localStorage.getItem('jwt');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const userId = localStorage.getItem('userId');

    // const [interViewerDetails, setInterViewerDetails] = useState("");
    const [slots, setSlots] = useState([]);
    const [date, setDate] = useState("");
    const [statusId, setStatus] = useState([]);
    const [clickResult, setClickResult] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [form] = Form.useForm();
    const { Column, ColumnGroup } = Table;
    const [dataSource, setdataSource] = useState([]);
    const [pagesize, setPagesize] = useState(0);
    const [totalpages, setTotalpages] = useState(0);
    const [pageDefaultValue, setPageDefaultValue] = useState(1);
    const [statusList, setStatusList] = useState([]);
    const [pn, setPn] = useState(1);
    const [ps, setTotalPs] = useState(10);




    const { Option } = Select;
    const showModal = () => {
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


    const handleTableChange = (item) => {
        setIsModalVisible({ isModalVisible: true });
        setClickResult(item);
        console.log(item)
    };
    const handleTableLinkCreation = (item) => {
        getLinkCreation(item);
    };


    useEffect(() => {
        getInterviewer(pn, ps);
        getStatusList();
    }, []);

    const getInterviewer = (pageNumber, pageSize) => {
        apiService(`users/allinterviewlist?statusId=44,45,46,47,48,49,50&` + "pn=" + pageNumber + "&ps=" + pageSize, 'get', '', false, jwt,
            result => {
                if (result.data) {
                    const resultPush = [];
                    result.data.content.map(data => {
                        resultPush.push({
                            key: data.id,
                            date: data.date,
                            time: data.time,
                            name: data.firstname + " " + data.lastname,
                            status: data.status,
                        });
                    });
                    setPagesize(result.data.pagesize);
                    setTotalpages(result.data.totalelements)
                    setdataSource(resultPush);
                    setIsLoading(true);
                }
            },
            (error) => {
            });
    };

    const getStatusList = () => {
        apiService(`users/statuslist`, 'get', '', false, jwt,
            result => {
                if (result.data) {
                    setStatusList([...result.data]);
                }
            },
            (error) => {

            });
    };

    const getLinkCreation = (data) => {
        apiService(`myinterview/meetinglink/` + data.key, 'get', '', false, jwt,
            result => {
                if (result.data) {
                    Notification.openNotificationSuccess("Link creation success!");
                }
            },
            (error) => {

            });
    };


    const handlePagination = (values) => {
        setIsLoading(false);
        setPageDefaultValue(values)
        getInterviewer(values, ps)
    };

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
            title: "Action",
            key: "Actions",

            render: (record) => {
                return (
                    <Space>
                        <Button onClick={() => {
                            handleTableChange(record);
                        }} type="primary" >Edit</Button>
                        <Button onClick={() => {
                            handleTableLinkCreation(record);
                        }} type="primary" >Link</Button>
                    </Space>

                );
            },
        }
    ];


    const handleSubmit = () => {
        console.log("test")

    }



    const submit = () => {
        apiService(`myinterview/statusupdate`, 'put', {
            "id": clickResult.key,
            "statusId": statusId
        }, false, jwt,
            result => {
                if (result.data.message) {
                    Notification.openNotificationSuccess(result.data.message)
                    setIsModalVisible(false);
                    getInterviewer(pn, ps);

                } else {
                    Notification.openNotificationFaliure(result.data.message)
                }
            },
            (error) => {

            });
    }


    return (
        <div className='intervieweradd_page'>
            {isLoading == false ?
                <div className="spinner">
                    <Spin />
                </div> :
                <div>
                    <div className="interviewer_page_container p_10">
                        <Modal title="Update Status" okText="Update" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                            <Form name="slot" form={form} onFinish={handleSubmit} layout="vertical">
                                <Row>
                                    <Col span={12}>
                                        <label >Select Status</label>
                                        <Form.Item
                                            name="time"
                                            rules={[{ message: 'Please select status!', required: true }]}>
                                            <Select
                                                showSearch
                                                style={{ width: '100%' }}
                                                value={statusId} onChange={e => setStatus(e)}
                                                placeholder="SELECT STATUS"
                                                optionFilterProp="children"
                                                filterOption={(input, option) =>
                                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                }
                                                filterSort={(optionA, optionB) =>
                                                    optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                                }
                                            >
                                                {statusList.map(item => {
                                                    return (<Option value={item.id}>{item.name}</Option>)
                                                })}

                                            </Select>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form>

                        </Modal>

                        <div className='interviewer-container'>
                            <div className="App">
                            </div>
                            <div>
                                <Table dataSource={dataSource} columns={columns} pagination={false} />
                                <Pagination hideOnSinglePage={true} current={pageDefaultValue} onChange={handlePagination} total={totalpages} />

                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );

}

export default Interviews;
