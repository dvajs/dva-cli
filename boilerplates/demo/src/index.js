import dva, { connect } from 'dva';
import { Router, Route } from 'dva/router';
import fetch from 'dva/fetch';
import React from 'react';
import './index.html';

// 1. Initialize
const app = dva();

// 2. Model
// Remove the comment and define your model.
//app.model({});

// 3. Router
const HomePage = () => <div>Hello Dva.</div>;
app.router(({ history }) =>
  <Router history={history}>
    <Route path="/" component={HomePage} />
  </Router>
);

// 4. Start
app.start('#root');
