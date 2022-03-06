import './interviewee-details.scss';
import { Button, Table, } from 'antd';
import { DatePicker } from 'antd';
import { Modal, Spin, Pagination } from 'antd';
import { TimePicker } from 'antd';
import moment from 'moment';
import { Row, Col } from 'antd';
import apiService from "../../../utils/apiService";
import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { EditOutlined } from "@ant-design/icons";



const Interviewee = () => {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);
    const jwt = localStorage.getItem('jwt');
    const [dataSource, setdataSource] = useState([]);
    const [pagesize, setPagesize] = useState(0);
    const [totalpages, setTotalpages] = useState(0);
    const [pageDefaultValue, setPageDefaultValue] = useState(1);

    const [pn, setPn] = useState(1);
    const [ps, setTotalPs] = useState(10);





    const handleTableChange = (item) => {
        console.log(item)
        history.push({ pathname: '/admin/interviewee-details', state: { data: item } });
    };



    useEffect(() => {
        getInterviewee(pn, ps);
    }, []);


    const getInterviewee = (pageNumber, pageSize) => {
        apiService(`users/userslist/2?` + "pn=" + pageNumber + "&ps=" + pageSize, 'get', '', false, jwt,
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

    const handlePagination = (values) => {
        setIsLoading(false);
        setPageDefaultValue(values)
        getInterviewee(values, ps)
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
        // {
        //     title: "Action",
        //     key: "Actions",

        //     render: (record) => {
        //         return (
        //             <>
        //                 <Button onClick={() => {
        //                     handleTableChange(record);
        //                 }} type="primary" >MORE</Button>
        //             </>
        //         );
        //     },
        // }
    ];
    return (


        <div className="admin_interviewee p_10">
            {isLoading == false ?
                <div className="spinner">
                    <Spin />
                </div> :
                <div>
                    <div className='interviewee-container'>
                        <div className="App">
                        </div>
                        <div>
                            <Table dataSource={dataSource} columns={columns} pagination={false} />
                            <Pagination hideOnSinglePage={true} current={pageDefaultValue} onChange={handlePagination} total={totalpages} />
                        </div>
                    </div>
                </div>
            }
        </div>
    );

}

export default Interviewee;
