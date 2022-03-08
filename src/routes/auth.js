import React, { lazy, Suspense } from 'react';
import { Spin } from 'antd';
import { Switch, Route, Redirect } from 'react-router-dom';
import AuthLayout from '../container/profile/authentication/Index';

// const Login = lazy(() => import('../container/profile/authentication/overview/SignIn'));
// const SignUp = lazy(() => import('../container/profile/authentication/overview/Signup'));
const Login = lazy(() => import('../container/profile/login/login-page'));

const ForgotPass = lazy(() => import('../container/profile/authentication/overview/ForgotPassword'));
// const Login = lazy(() => import('../pages/login/login-page'));

const Signup = lazy(() => import('../pages/interviewee/signup/signup-page'));
const YourSelf = lazy(() => import('../pages/interviewee/yourself/yourself-page'));
const YourSkill = lazy(() => import('../pages/interviewee/yourskill/yourskill-page'));
const ProgrammingLanguages = lazy(() => import('../pages/interviewee/programmingLanguages/programmingLanguages-page'));
const InterestArea = lazy(() => import('../pages/interviewee/interestArea/interestArea-page'));


// import Signup from '@pages/interviewee/signup/signup-page';
// import YourSelf from '@pages/interviewee/yourself/yourself-page';
// import YourSkill from '@pages/interviewee/yourskill/yourskill-page';
// import ProgrammingLanguages from '@pages/interviewee/programmingLanguages/programmingLanguages-page';
// import InterestArea from '@pages/interviewee/interestArea/interestArea-page';
// import Logout from '@pages/interviewee/logout/logout';

const NotFound = () => {
  return <Redirect to="/" />;
};

const FrontendRoutes = () => {
  return (
    <Switch>
      <Suspense
        fallback={
          <div className="spin">
            <Spin />
          </div>
        }
      >
        <Route exact path="/forgotPassword" component={ForgotPass} />
        <Route exact path="/" component={Login} />
			<Route path="/signup" component={Signup} />
			<Route path="/yourself" component={YourSelf} />
			<Route path="/yourskill" component={YourSkill} />
			<Route path="/programminglanguages" component={ProgrammingLanguages} />
			<Route path="/interestarea" component={InterestArea} />
			<Route path="/login" component={Login} />
        <Route exact path="*" component={NotFound} />
      </Suspense>
    </Switch>
  );
};

export default AuthLayout(FrontendRoutes);
