import React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import DashboardContainer from './components/Dashboard/DashboardContainer';
import store from './redux/reduxStore';

function App() {
  return (
    <div className="App">
      <DashboardContainer />
    </div>
  );
}

const AppSquare: React.FC = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default AppSquare;
