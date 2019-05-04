import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './containers/';
import Screen from './containers/Screen';
import Logo from './components/logo';
import './unit/const';
import './control';
import { subscribeRecord } from './unit';

subscribeRecord(store); // 将更新的状态记录到localStorage

// Logo.Content.remove('1');
// Logo.Content.add(<div key="new">hello world</div>, {sortOrder: -1});

render(
  <Provider store={store}>
    <App />
  </Provider>
    , document.getElementById('root')
);

