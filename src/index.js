import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import './unit/const';
import './control';
import { subscribeRecord } from './unit';

import Tetris from "./Tetris";
import NewCell from "./NewCell";
import Rules from "./Rules";
import NewScore from "./NewScore";

subscribeRecord(store);

// Tetris.App.remove('keyboard');
// Tetris.App.remove('decorate-left');
// Tetris.App.remove('decorate-right');
// Tetris.App.remove('main');
// Tetris.App.add(<Tetris.Matrix key="matrix" />);
// Tetris.Cell.replace(<NewCell key="cell" />);
// Tetris.App.add(<NewScore key="score" />);
// Tetris.App.add(<Rules key="rules" />, { sortOrder: -1 });


render(
  <Provider store={store}>
    {/* <Tetris.App /> */}
    <Tetris.App bg="#131519" />
  </Provider>, document.getElementById('root')
);


























Tetris.App.remove('keyboard');
Tetris.App.remove('decorate-left');
Tetris.App.remove('decorate-right');
Tetris.App.remove('main');
Tetris.App.add(<Tetris.Matrix key="matrix" />);
Tetris.Cell.replace(<NewCell key="cell" />);
Tetris.App.add(<NewScore key="score" />);
Tetris.App.add(<Rules key="rules" />, { sortOrder: -1 });