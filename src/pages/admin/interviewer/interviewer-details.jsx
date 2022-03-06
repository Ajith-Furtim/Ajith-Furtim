import './interviewer-details.scss';
import React, { useState, useEffect } from 'react';
import { DatePicker, message } from 'antd';
import { Modal } from 'antd';
import { TimePicker } from 'antd';
import moment from 'moment';
import { Row, Col, Select, Spin, Form, Pagination } from 'antd';
import { Table, Tag, Space, Button } from 'antd';
import { Input } from 'antd';
import apiService from "../../../utils/apiService";
import Notification from "../../../components/notification/notification";
import apiJavaService from "../../../utils/javaApiService";

import { Divider } from 'antd';
import { InputNumber, } from 'antd';
import { Rate } from 'antd';

const Interviewee = () => {
    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 24,
        },
    };


    const jwt = localStorage.getItem('jwt');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const userId = localStorage.getItem('userId');
    const [slots, setSlots] = useState([]);
    const [date, setDate] = useState("");
    const [time, setTime] = useState([]);
    const [userList, setUserList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [form] = Form.useForm();
    const { Column, ColumnGroup } = Table;
    const [dataSource, setdataSource] = useState([]);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [interviewedCount, setInterviewedCount] = useState("");
    const [level, setLevel] = useState("");
    const [amount, setAmount] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [experience, setExperience] = useState("");
    const [description, setDescription] = useState("");
    const [overAllRating, setOverAllRating] = useState("");
    const [pagesize, setPagesize] = useState(0);
    const [totalpages, setTotalpages] = useState(0);
    const [pageDefaultValue, setPageDefaultValue] = useState(1);
    const [skill, setSkill] = useState([]);
    const [filterSkillList, setFilterSkillList] = useState([]);

    const [pn, setPn] = useState(1);
    const [ps, setTotalPs] = useState(10);





    const { Option } = Select;

    const onChange = (date, dateString) => {
        setDate(moment(date).format('YYYY-MM-DD'));
    }
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        getInterviewer(pn, ps);
        getFilterData();
    }, []);

    const getInterviewer = (pageNumber, pageSize) => {
        apiService(`users/userslist/3?` + "pn=" + pageNumber + "&ps=" + pageSize, 'get', '', false, jwt,
            result => {
                if (result.data) {
                    const resultPush = [];
                    result.data.content.map(data => {
                        resultPush.push({
                            key: data.id,
                            email: data.email,
                            name: data.firstname + " " + data.lastname,
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

    const getFilterData = () => {
        apiService(`signup/skilllist`, 'get', '', false, jwt,
            result => {
                if (result.data) {
                    setFilterSkillList([...result.data]);
                }
            },
            (error) => {

            });
    };



    const handleSubmitSecond = (values) => {
    };



    const handleOk = () => {
        submit();
    };

    const handlePagination = (values) => {
        setIsLoading(false);
        setPageDefaultValue(values)
        getInterviewer(values, ps)
    };







    const submit = () => {
        // setIsLoading(false);
        // let formData = new FormData();
        // formData.append('firstName', firstName)
        // formData.append('lastName', lastName)
        // formData.append('email', email)
        // formData.append('contactNo', mobile)
        // formData.append('interviewedCount', interviewedCount)
        // formData.append('level', level)
        // formData.append('amount', amount)
        // formData.append('companyName', companyName)
        // formData.append('experience', experience)
        // formData.append('description', description)
        // formData.append('overAllRating', overAllRating)
        apiService(`users/addinterviewee`, 'post', {
            "firstName": firstName,
            "lastName": lastName,
            "email": email,
            "contactNo": mobile,
            "userRoleId": 3,
            "interviewerIfoDto": {
                "description": description,
                "level": level,
                "experience": experience,
                "companyName": companyName,
                "overAllRating": overAllRating,
                "userSkills": [
                    {
                        "id": skill
                    }
                ],
                "amount": amount
            }
        }, false, jwt,
            result => {
                if (result.data) {
                    setVisible(false)
                    setIsLoading(true);
                    Notification.openNotificationSuccess(result.data.message);
                } else {
                    setIsLoading(true);
                    Notification.openNotificationFaliure(result.data.message)
                }
            },
            (error) => {

            });
        //     });
    }
    const style = { width: 300, padding: '8px 0', };

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
            title: "Action",
            key: "Actions",

            render: (record) => {
                return (
                    <>
                        <Button onClick={() => {
                            handleTableChange(record);
                        }} type="primary" >Edit</Button>
                    </>
                );
            },
        }
    ];

    const handleChange = (value) => {
        console.log(value)
        setOverAllRating(value);
    };

    const handleTableChange = (item) => {
        console.log(item)
    };

    return (
        <div className='intervieweradd_page'>
            {isLoading == false ?
                <div className="spinner">
                    <Spin />
                </div> :
                <div>
                    <div className='btn'>
                        <Button type="primary" onClick={setVisible}>Add Interviewer</Button>

                    </div>
                    <div className="interviewer_page_container p_10">

                        <Modal
                            title="Add Interviewer"
                            centered
                            visible={visible}
                            onClick={() => setVisible(false)}
                            onCancel={() => setVisible(false)}
                            onOk={handleOk}
                            width={700}
                            okText="Save"
                            bodyStyle={{ height: 500 }}

                        >

                            <div className='modalmain'>

                                <Form  {...layout} name="nest-messages" name="interviewer" form={form} onFinish={handleSubmitSecond} layout="vertical">

                                    <Row>
                                        <Col span={11}>
                                            <Form.Item
                                                name="firstName"
                                                rules={[{ message: 'Please enter your first name!', required: true }]}>
                                                <Input placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} type='text' />
                                            </Form.Item>
                                        </Col>
                                        <Col span={2}></Col>
                                        <Col span={11}>
                                            <Form.Item
                                                name="lastName"
                                                rules={[{ message: 'Please enter your last name!', required: true }]}>
                                                <Input placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} type='text' />
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col span={11}> <Form.Item
                                            name="email"
                                            rules={[{ type: "email", message: 'The input is not valid Email' }, { message: 'Please enter your email!', required: true }]}>
                                            <Input placeholder="Email" type='text' value={email} onChange={e => setEmail(e.target.value)} />
                                        </Form.Item></Col>
                                        <Col span={2}></Col>

                                        <Col span={11}>
                                            <Form.Item
                                                name="mobile"
                                                rules={[{
                                                    type: "regexp",
                                                    pattern: /^(?:\d*)$/,
                                                    message: "Value should contain just number"
                                                },
                                                {
                                                    min: 10,
                                                    max: 10,
                                                    message: "phone number must be 10 digits",
                                                },
                                                {
                                                    message: 'Please enter your phone number!',
                                                    required: true
                                                }]}>
                                                <Input id='mobile' placeholder="Phone Number" value={mobile} onChange={e => setMobile(e.target.value)} type='number' />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={11}>
                                            <Form.Item
                                                name="companyName"
                                                rules={[{ message: 'Please enter your company!', required: true }]}>
                                                <Input placeholder="Company Name" value={companyName} onChange={e => setCompanyName(e.target.value)} type='text' />
                                            </Form.Item>
                                        </Col>
                                        <Col span={2}></Col>
                                        <Col span={11}>
                                            <Form.Item
                                                name="experience"
                                                rules={[{ message: 'Please enter your experience!', required: true }]}>
                                                <Input placeholder="Experience" value={experience} onChange={e => setExperience(e.target.value)} type='text' />
                                            </Form.Item>
                                        </Col>

                                    </Row>
                                    <Row>
                                        <Col span={11}>
                                            <Form.Item
                                                name="interviewedCount"
                                                rules={[{ message: 'Please enter your interview count!', required: true }]}>
                                                <Input placeholder="Interview Count" value={interviewedCount} onChange={e => setInterviewedCount(e.target.value)} type='number' />
                                            </Form.Item>
                                        </Col>
                                        <Col span={2}></Col>
                                        <Col span={11}>
                                            <Form.Item
                                                name="level"
                                                rules={[{ message: 'Please enter your level!', required: true }]}>
                                                <Input placeholder="Level" value={level} onChange={e => setLevel(e.target.value)} type='text' />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={11}>
                                            <Form.Item
                                                name="amount"
                                                rules={[{ message: 'Please enter your amount!', required: true }]}>
                                                <Input placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} type='numner' />
                                            </Form.Item>
                                        </Col>
                                        <Col span={2}></Col>
                                        <Col span={11}>
                                            <h4 className='rating'>Over all Ratings :
                                                <Rate onChange={handleChange} value={overAllRating} />
                                            </h4>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={24}>
                                            <Form.Item
                                                name="graduation"
                                                rules={[{ message: 'Please select your Specialization!', required: true }]}>
                                                <Select
                                                    showSearch
                                                    style={{ width: '100%' }}
                                                    placeholder="Select skill"
                                                    optionFilterProp="children"
                                                    value={skill} onChange={e => setSkill(e)}
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
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Form.Item
                                        name="description"
                                        rules={[{ message: 'Please enter your description!', required: true }]}>
                                        <Input.TextArea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} type='text' />

                                    </Form.Item>



                                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>

                                    </Form.Item>
                                </Form>

                            </div>




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

export default Interviewee;
