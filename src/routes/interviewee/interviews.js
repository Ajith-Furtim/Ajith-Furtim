import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';

const Interviews = lazy(() => import('../../pages/interviewee/interviews/interviews-page'));
const Product = lazy(() => import('../../container/ecommerce/product/Products'));


const InterviewsRoutes = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path} component={Product} />
    </Switch>
  );
};

export default InterviewsRoutes;