import React from 'react';
import { Row, Col } from 'antd';
import { Aside, Content } from './overview/style';
import Heading from '../../../components/heading/heading';

const AuthLayout = WraperContent => {
  return () => {
    return (
      <Row>       

        <Col xxl={24} xl={24} lg={24} md={24} xs={23}>
          <WraperContent />
        </Col>
        {/* <Col xxl={8} xl={9} lg={12} md={8} xs={24}>
          <Aside>
            <div className="auth-side-content">
              <Content>
                <img
                  className="auth-content-figure"
                  src={require('../../../assets/images/login.png')}
                  alt=""
                />
              </Content>
            </div>
          </Aside>
        </Col> */}
      </Row>
      
    );
  };
};

export default AuthLayout;
