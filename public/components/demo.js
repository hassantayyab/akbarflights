import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
// components
import App from './app';

const MainApp = () => {
  return (
    <div>
      <BrowserRouter>
        <Route exact path="/" component={Home}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/courses" component={Courses}></Route>
        <Route path="/assignments" component={Assignments}></Route>
        <Route path="app" component={App}></Route>
        <Route path="app2" component={App2}></Route>
        <Route path="app3" component={App3}></Route>
        <Route path="app4" component={App4}></Route>
      </BrowserRouter>
    </div>
  );
};

export default MainApp;
