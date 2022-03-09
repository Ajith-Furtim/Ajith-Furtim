import React, { lazy, Suspense } from 'react';
import { Spin } from 'antd';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import withAdminLayout from '../../layout/withAdminLayout';
import IntervieweeInterviews from './interviews';

   

// const ScheduledInterview = lazy(() => import('../../pages/interviewee/scheduledInterview/scheduledInterview-page'));
// const ReScheduledInterview = lazy(() => import('../../pages/interviewee/rescheduleInterview/rescheduleInterview-page'));
// const CancelInterview = lazy(() => import('../../pages/interviewee/cancelInterview/cancelInterview-page'));
// const ConfirmedInterview = lazy(() => import('../../pages/interviewee/confirmedInterview/confirmedInterview-page'));
// const InterviewProfile = lazy(() => import('../../pages/interviewee/interviewProfile/interviewProfile-page'));
// // const Profile = lazy(() => import('../../pages/interviewee/profile/profile-page'));

const Settings = lazy(() => import('../../container/profile/settings/Settings'));
const Logout = lazy(() => import('../../pages/logout/logout'));

const Interviews = lazy(() => import('../../new-pages/interviewee/interviews/interviews'));
const Schedule = lazy(() => import('../../new-pages/interviewee/schedule/schedules'));
const Profile = lazy(() => import('../../new-pages/interviewee/profile/Settings'));
const ScheduledInterview = lazy(() => import('../../new-pages/interviewee/scheduledInterview/scheduledInterview-page'));
const ReScheduledInterview = lazy(() => import('../../new-pages/interviewee/rescheduleInterview/rescheduleInterview-page'));
const CancelInterview = lazy(() => import('../../new-pages/interviewee/cancelInterview/cancelInterview-page'));
const ConfirmedInterview = lazy(() => import('../../new-pages/interviewee/confirmedInterview/confirmedInterview-page'));
const InterviewProfile = lazy(() => import('../../new-pages/interviewee/interviewProfile/interviewProfile-page'));

const Interviewee = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Suspense
        fallback={
          <div className="spin">
            <Spin />
          </div>
        }
      >
      {/* <Route path={path} component={IntervieweeInterviews} />
      <Route  path={`${path}/interviews`} component={Interviews} />
      <Route  path={`${path}/schedule`} component={Schedule} />
			<Route path={`${path}/scheduledinterview`} component={ScheduledInterview} />
			<Route path={`${path}/rescheduledinterview`} component={ReScheduledInterview} />
			<Route path={`${path}/cancelinterview`} component={CancelInterview} />
			<Route path={`${path}/confirmedinterview`} component={ConfirmedInterview} />
			<Route path={`${path}/interviewerprofile`} component={InterviewProfile} />
      <Route path={`${path}/Profile`} component={Profile} /> */}
      
      <Route path={path} component={IntervieweeInterviews} />
      <Route  path={`${path}/interviews`} component={Interviews} />
      <Route  path={`${path}/schedule`} component={Schedule} />
			<Route path={`${path}/scheduledinterview`} component={ScheduledInterview} />
			<Route path={`${path}/rescheduledinterview`} component={ReScheduledInterview} />
			<Route path={`${path}/cancelinterview`} component={CancelInterview} />
			<Route path={`${path}/confirmedinterview`} component={ConfirmedInterview} />
			<Route path={`${path}/interviewerprofile`} component={InterviewProfile} />
      <Route path={`${path}/profile`} component={Profile} />
      <Route path={`${path}/logout`} component={Logout} />

      </Suspense>
    </Switch>
  );
};

export default withAdminLayout(Interviewee);
