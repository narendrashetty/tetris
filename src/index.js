import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './containers/';
import './unit/const';
import './control';
import { subscribeRecord } from './unit';

subscribeRecord(store); // 将更新的状态记录到localStorage

App.Content.remove('keyboard');
App.Content.add(<p key="new-key">Hello world</p>, {sortOrder: 1});

render(
  <Provider store={store}>
    <App />
  </Provider>
    , document.getElementById('root')
);

