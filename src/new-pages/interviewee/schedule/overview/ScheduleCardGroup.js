import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Progress ,Button,Rate} from 'antd';
import FeatherIcon from 'feather-icons-react';
import { UserCard } from '../style';
import Heading from '../../../../components/heading/heading';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import { Dropdown } from '../../../../components/dropdown/dropdown';
import userImg from '../../../../../src/assets/imges/user.png';

const UserCardGroup = ({ schedule }) => {
  const {userId, firstName, lastName, interviewerInfo, icon, content } = schedule;
  return (
    <UserCard>
      <div className="card user-card theme-grid-3">
        <Cards headless>
          <div className="card__top">
            <div className="user-card__img">
              <img src={userImg} alt="" />
            </div>
            <div className="user-card__info">
              <Heading className="card__name" as="h6">
                <Link className="name-text" to="#">
                  {firstName} {lastName}
                </Link>
                <p className="card__designation">{interviewerInfo.companyName}</p>
              </Heading>
              {/* <Dropdown
                content={
                  <>
                    <Link to="#">View</Link>
                    <Link to="#">Edit</Link>
                    <Link to="#">Leave</Link>
                    <Link to="#">Delete</Link>
                  </>
                }
              >
                <Link className="action-more" to="#">
                  <FeatherIcon icon="more-horizontal" />
                </Link>
              </Dropdown> */}
            </div>
          </div>
          <div className="card__content">
            <p>{interviewerInfo.description}</p>
          </div>
          <div className="card__info">
            <p className="info-line">
              <span>Rating</span>
              <span>Amount</span>
            </p>
            <h2 className="info-line">
              <span> <Rate allowHalf defaultValue={interviewerInfo.overAllRating} disabled /></span>
              <span className="success" style={{ background: 'none !important' }}>
              {interviewerInfo.amount}
              </span>
            </h2>
          <div className="sch-btn">
          <Link to={{ pathname: "/interviewee/interviewerprofile", state: { data: schedule } }}>
            <Button size="large" type="primary">
            SCHEDULE   
            </Button>
            </Link>
          </div>
          </div>
        </Cards>
      </div>
    </UserCard>
  );
};

UserCardGroup.propTypes = {
  user: PropTypes.object,
};

export default UserCardGroup;
