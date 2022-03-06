import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Progress ,Button,Rate} from 'antd';
import FeatherIcon from 'feather-icons-react';
import { UserCard } from '../style';
import Heading from '../../../components/heading/heading';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Dropdown } from '../../../components/dropdown/dropdown';

const UserCardGroup = ({ user }) => {
  const { title, company, img, icon, content } = user;
  return (
    <UserCard>
      <div className="card user-card theme-grid-3">
        <Cards headless>
          <div className="card__top">
            <div className="user-card__img">
              <img src={require(`../../../${icon}`)} alt="" />
            </div>
            <div className="user-card__info">
              <Heading className="card__name" as="h6">
                <Link className="name-text" to="#">
                  {title}
                </Link>
                <p className="card__designation">{company}</p>
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
            <p>{content}</p>
          </div>
          <div className="card__info">
            <p className="info-line">
              <span>Rating</span>
              <span>Experience</span>
            </p>
            <h2 className="info-line">
              <span> <Rate allowHalf defaultValue={5} disabled /></span>
              <span className="success" style={{ background: 'none !important' }}>
                10
              </span>
            </h2>
          <div className="sch-btn">
            <Button size="large" type="primary">
            SCHEDULE   
            </Button>
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
