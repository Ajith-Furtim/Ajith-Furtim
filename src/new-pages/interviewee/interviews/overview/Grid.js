import React, { useState, useEffect } from 'react';
import { Row, Col, Pagination, Spin } from 'antd';
import { useSelector } from 'react-redux';
import ProductCards from './InterviewCards';
import Heading from '../../../../components/heading/heading';
import { PaginationWrapper, NotFoundWrapper } from '../Style';
import apiService from "../../../../utils/apiService";
import moment from 'moment';

const Grid = () => {
  const jwt = localStorage.getItem('jwt');
  const [completedInterviewsList, setCompletedInterviewsList] = useState([]);
  const [scheduledInterviewsList, setScheduledInterviewsList] = useState([]);
  const [interviewFilterDataTypes, setInterviewFilterDataTypes] = useState([]);
  const [interviewFilterDataCompany, setInterviewFilterDataCompany] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [skillSelectId, setskillSelectId] = useState("");
  const [companySelectName, setcompanySelectName] = useState("");

  const { productsAll, isLoader } = useSelector(state => {
    return {
      productsAll: state.products.data,
      isLoader: state.products.loading,
    };
  });

  const [state, setState] = useState({
    products: productsAll,
    current: 0,
    pageSize: 0,
  });

  const { products } = state;

  useEffect(() => {
    getMyInterviewsList(skillSelectId, companySelectName,);
    if (productsAll) {
      setState({
        products: productsAll,
      });
    }
  }, [productsAll]);

  const onShowSizeChange = (current, pageSize) => {
    setState({ ...state, current, pageSize });
  };

  const onHandleChange = (current, pageSize) => {
    // You can create pagination in here
    setState({ ...state, current, pageSize });
  };



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
              console.log(result.data)
                setScheduledInterviewsList([...result.data]);
            }
        },
        (error) => {

        });
};

  return (
    <Row gutter={30}>
      {isLoader ? (
        <Col xs={24}>
          <div className="spin">
            <Spin />
          </div>
        </Col>
      ) : products.length ? (
        products.map(({ id, name, rate, price, oldPrice, popular, img }) => {
          return (
            <Col xxl={6} lg={6} xs={24} key={id}>
              <ProductCards product={{ id, name, rate, price, oldPrice, popular, img }} />
            </Col>
          );
        })
      ) : (
        <Col md={24}>
          <NotFoundWrapper>
            <Heading as="h1">Data Not Found</Heading>
          </NotFoundWrapper>
        </Col>
      )}
      {/* <Col xs={24} className="pb-30">
        <PaginationWrapper style={{ marginTop: 10 }}>
          {products.length ? (
            <Pagination
              onChange={onHandleChange}
              showSizeChanger
              onShowSizeChange={onShowSizeChange}
              pageSize={10}
              defaultCurrent={1}
              total={40}
            />
          ) : null}
        </PaginationWrapper>
      </Col> */}
    </Row>
  );
};

export default Grid;
