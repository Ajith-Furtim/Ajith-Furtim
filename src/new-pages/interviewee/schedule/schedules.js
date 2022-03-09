import React, { useState, lazy, Suspense,useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Pagination, Skeleton } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { Link, Switch, Route, useRouteMatch, NavLink } from 'react-router-dom';
import { UsercardWrapper, UserCarrdTop } from './style';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Main, CardToolbox } from '../../styled';
import { AutoComplete } from '../../../components/autoComplete/autoComplete';
import { Button } from '../../../components/buttons/buttons';
import { Cards } from '../../../components/cards/frame/cards-frame';
import apiService from "../../../utils/apiService";

const UserCardGroup = lazy(() => import('./overview/ScheduleCardGroup'));

const Users = () => {
  const jwt = localStorage.getItem('jwt');
  const userId = localStorage.getItem('userId');
  const [scheduleList, setScheduleList] = useState([]);
  const [filterSkillList, setFilterSkillList] = useState([]);
  const [filterCompanyList, setFilterCompanyList] = useState([]);
  const [filterExperienceList, setFilterExperienceList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  const [skillSelectId, setskillSelectId] = useState("");
  const [companySelectName, setcompanySelectName] = useState("");
  const [experienceSelect, setexperienceSelect] = useState("");
  const [ratingSelect, setratingSelect] = useState("");
  const { searchData, users, userGroup } = useSelector(state => {
    return {
      searchData: state.headerSearchData,
      users: state.users,
      userGroup: state.userGroup,
    };
  });

  const { path } = useRouteMatch();

  const [state, setState] = useState({
    notData: searchData,
    current: 0,
    pageSize: 0,
    page: 0,
  });

  const { notData } = state;

  const handleSearch = searchText => {
    const data = searchData.filter(item => item.title.toUpperCase().startsWith(searchText.toUpperCase()));
    setState({
      ...state,
      notData: data,
    });
  };

  const onShowSizeChange = (current, pageSize) => {
    setState({ ...state, current, pageSize });
  };

  const onChange = page => {
    setState({ ...state, page });
  };

  
  useEffect(() => {
    getScheduleList(skillSelectId, companySelectName, experienceSelect, ratingSelect);
    getFilterData();
    getFilterCompany();
}, []);


const getScheduleList = (skillSelectId, companySelectName, experienceSelect, ratingSelect) => {

  var apiUrl = `myinterviews/favlist?skillId=&companyName=&experience=&rating=`;
  if (skillSelectId != "") {
      apiUrl = "myinterviews/favlist?skillId=" + skillSelectId + "&companyName=&experience=&rating=";
  } if (skillSelectId == "" && companySelectName != "") {
      apiUrl = "myinterviews/favlist?skillId=&companyName=" + companySelectName + "&experience=&rating=";
  } if (skillSelectId == "" && companySelectName == "" && experienceSelect != "") {
      apiUrl = "myinterviews/favlist?skillId=&companyName=&experience=" + experienceSelect + "&rating=";
  } if (skillSelectId != "" && companySelectName != "" && experienceSelect != "") {
      apiUrl = "myinterviews/favlist?skillId=" + skillSelectId + "&companyName=" + companySelectName + "&experience=" + experienceSelect + "&rating=";
  } if (skillSelectId != "" && companySelectName != "" && experienceSelect == "") {
      apiUrl = "myinterviews/favlist?skillId=" + skillSelectId + "&companyName=" + companySelectName + "&experience=&rating=";
  } if (skillSelectId != "" && companySelectName == "" && experienceSelect != "") {
      apiUrl = "myinterviews/favlist?skillId" + skillSelectId + "=&companyName=&experience=" + experienceSelect + "&rating=";
  } if (skillSelectId == "" && companySelectName != "" && experienceSelect != "") {
      apiUrl = "myinterviews/favlist?skillId=&companyName=" + companySelectName + "&experience=" + experienceSelect + "&rating=";
  }
  apiService(apiUrl, 'get', '', false, jwt,
      result => {
          if (result.data) {
              setScheduleList([...result.data]);
              setIsLoading(true)
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
              console.log(result.data)
          }
      },
      (error) => {

      });
};
const getFilterCompany = () => {
  apiService(`users/companyname`, 'get', '', false, jwt,
      result => {
          if (result.data) {
              setFilterCompanyList([...result.data]);
              setFilterExperienceList([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
              console.log(result.data)
          }
      },
      (error) => {

      });
};


  return (
    <>
      <CardToolbox>
        <UserCarrdTop>
          <PageHeader
            ghost
            title="Schedule your discussions with skilled consultants"
          />
        </UserCarrdTop>
      </CardToolbox>
      <Main>
        <UsercardWrapper>
          <Row gutter={25}>
            <Switch>
              <Route
                path={path}
                component={() => {
                  return scheduleList.map(schedule => {
                    const { id } = schedule;

                    return (
                      <Col key={id} xxl={8} md={8} sm={24} xs={24}>
                        <Suspense
                          fallback={
                            <Cards headless>
                              <Skeleton avatar active />
                            </Cards>
                          }
                        >
                          <UserCardGroup schedule={schedule} />
                        </Suspense>
                      </Col>
                    );
                  });
                }}
              />

            </Switch>

            {/* <Col xs={24}>
              <div className="user-card-pagination">
                <Pagination
                  onChange={onChange}
                  showSizeChanger
                  onShowSizeChange={onShowSizeChange}
                  defaultCurrent={6}
                  total={500}
                />
              </div>
            </Col> */}
          </Row>
        </UsercardWrapper>
      </Main>
    </>
  );
};

export default Users;
