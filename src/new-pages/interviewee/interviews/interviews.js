import React, { lazy, useState, Suspense,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Radio, Spin, Skeleton } from 'antd';
import { Switch, NavLink, Route, useRouteMatch } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Main } from '../../styled';
import { AutoComplete } from '../../../components/autoComplete/autoComplete';
import { TopToolBox } from './Style';
import { sorting } from '../../../redux/product/actionCreator';
import { Button } from '../../../components/buttons/buttons';
import { ShareButtonPageHeader } from '../../../components/buttons/share-button/share-button';
import { ExportButtonPageHeader } from '../../../components/buttons/export-button/export-button';
import { CalendarButtonPageHeader } from '../../../components/buttons/calendar-button/calendar-button';
import { Cards } from '../../../components/cards/frame/cards-frame';
import ProductCards from './overview/InterviewCards';

const Grid = lazy(() => import('./overview/Grid'));
import apiService from "../../../utils/apiService";

const Product = () => {
  const jwt = localStorage.getItem('jwt');
  const [completedInterviewsList, setCompletedInterviewsList] = useState([]);
  const [scheduledInterviewsList, setScheduledInterviewsList] = useState([]);
  const [interviewFilterDataTypes, setInterviewFilterDataTypes] = useState([]);
  const [interviewFilterDataCompany, setInterviewFilterDataCompany] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [skillSelectId, setskillSelectId] = useState("");
  const [companySelectName, setcompanySelectName] = useState("");
  const { path } = useRouteMatch();
  const dispatch = useDispatch();
  const searchData = useSelector(state => state.headerSearchData);

  const [state, setState] = useState({
    notData: searchData,
    active: 'active',
  });

  const { notData } = state;

  const handleSearch = searchText => {
    const data = searchData.filter(item => item.title.toUpperCase().startsWith(searchText.toUpperCase()));
    setState({
      ...state,
      notData: data,
    });
  };

  const onSorting = e => {
    dispatch(sorting(e.target.value));
  };

  
  useEffect(() => {
    getMyInterviewsList(skillSelectId, companySelectName,);
  }, []);

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
    <>
      <PageHeader
        ghost
        title="INTERVIEWS"
      />
      <Main>
      <h1>Schedule Interviews</h1>
        <Row gutter={30}>          
            <Switch>
               <Route
                path={path}
                component={() => {
                  return scheduledInterviewsList.map(interviewsList => {
                    const { id } = interviewsList;
                    return (
                      <Col xxl={6} lg={6} xs={24} key={id}>
                        <Suspense
                          fallback={
                            <Cards headless>
                              <Skeleton avatar active />
                            </Cards>
                          }
                        >
                          <ProductCards interview={interviewsList} />
                        </Suspense>
                      </Col>
                    );
                  });
                }}
              />
            </Switch>
        </Row>
        <h1>Completed Interviews</h1>

      </Main>
    </>
  );
};

export default Product;
