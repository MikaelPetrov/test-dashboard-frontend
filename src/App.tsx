import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import './App.css';
import DashboardContainer from './components/Dashboard/DashboardContainer';
import MainCTAPageContainer from './components/MainCTAPage/MainCTAPageContainer';
import store from './redux/reduxStore';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <div className="App">
          <Redirect from="/" to="/dashboard" />
          <Route exact path="/dashboard">
            <DashboardContainer />
          </Route>
          <Route path={`/:phase/:id`}>
            <MainCTAPageContainer />
          </Route>
        </div>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
