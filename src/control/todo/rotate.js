import { want } from '../../unit/';
import event from '../../unit/event';
import actions from '../../actions';
import states from '../states';
import { music } from '../../unit/music';

const down = (store) => {
  store.dispatch(actions.keyboard.rotate(true));
  if (store.getState().get('cur') !== null) {
    const state = store.getState();
        if (state.get('lock')) {
          return;
        }
        if (state.get('pause')) {
          states.pause(false);
        }
        const cur = state.get('cur');
        if (cur === null) {
          return;
        }
        if (music.rotate) {
          music.rotate();
        }
        const next = cur.rotate();
        if (want(next, state.get('matrix'))) {
          store.dispatch(actions.moveBlock(next));
        }
  } else {
    if (store.getState().get('lock')) {
      return;
    }
    if (music.move) {
      music.move();
    }
    const state = store.getState();
    const cur = state.get('cur');
    if (cur) {
      return;
    }
    let startLines = state.get('startLines');
    startLines = startLines + 1 > 10 ? 0 : startLines + 1;
    store.dispatch(actions.startLines(startLines));
  }
};

const up = (store) => {
  store.dispatch(actions.keyboard.rotate(false));
};

export default {
  down,
  up,
};
