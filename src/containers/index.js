import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import propTypes from 'prop-types';
import emotionStyled from "react-emotion";
import { DynamicComponent } from '@twilio/frame-ui/DynamicComponent';
import { DynamicContentStore } from '@twilio/frame-ui/DynamicContentStore';

import Matrix from '../components/matrix';
import Decorate from '../components/decorate';
import Number from '../components/number';
import Next from '../components/next';
import Music from '../components/music';
import Pause from '../components/pause';
import Point from '../components/point';
import Logo from '../components/logo';
import Keyboard from '../components/keyboard';
import Guide from '../components/guide';

import { transform, lastRecord, speeds, i18n, lan } from '../unit/const';
import { visibilityChangeEvent, isFocus } from '../unit/';
import states from '../control/states';
import Main from './Main';

const StyledApp = emotionStyled('div')`
  padding-top: 42px;
  box-shadow: 0 0 10px #fff inset;
  background: #efcc19;
  height: 100%;
    b {
      display: block;
      width: 20px;
      height: 20px;
      padding: 2px;
      border: 2px solid #879372;
      margin: 0 2px 2px 0;
      float: left;
      &:after {
        content: '';
        display: block;
        width: 12px;
        height: 12px;
        background: #879372;
        overflow: hidden;
      }
      &.c {
        border-color: #000;
        &:after {
          background: #000;
        }
      }
      &.d {
        border-color: #560000;
        &:after {
          background: #560000;
        }
      }
  }
`;
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      w: document.documentElement.clientWidth,
      h: document.documentElement.clientHeight,
    };
  }
  componentWillMount() {
    window.addEventListener('resize', this.resize.bind(this), true);
  }
  componentDidMount() {
    if (visibilityChangeEvent) { // 将页面的焦点变换写入store
      document.addEventListener(visibilityChangeEvent, () => {
        states.focus(isFocus());
      }, false);
    }

    if (lastRecord) { // 读取记录
      if (lastRecord.cur && !lastRecord.pause) { // 拿到上一次游戏的状态, 如果在游戏中且没有暂停, 游戏继续
        const speedRun = this.props.speedRun;
        let timeout = speeds[speedRun - 1] / 2; // 继续时, 给予当前下落速度一半的停留时间
        // 停留时间不小于最快速的速度
        timeout = speedRun < speeds[speeds.length - 1] ? speeds[speeds.length - 1] : speedRun;
        states.auto(timeout);
      }
      if (!lastRecord.cur) {
        states.overStart();
      }
    } else {
      states.overStart();
    }
  }
  resize() {
    this.setState({
      w: document.documentElement.clientWidth,
      h: document.documentElement.clientHeight,
    });
  }
  render() {
    let filling = 0;
    const size = (() => {
      const w = this.state.w;
      const h = this.state.h;
      const ratio = h / w;
      let scale;
      let css = {};
      if (ratio < 1.5) {
        scale = h / 960;
      } else {
        scale = w / 640;
        filling = (h - (960 * scale)) / scale / 3;
        css = {
          paddingTop: Math.floor(filling) + 42,
          paddingBottom: Math.floor(filling),
          marginTop: Math.floor(-480 - (filling * 1.5)),
        };
      }
      css[transform] = `scale(${scale})`;
      return css;
    })();

    return (
      <DynamicComponent
        name={App.displayName}
        contentStore={App.Content}
        childProps={this.props}
        customChildren={this.props.children}
      >
        <StyledApp>
          <Decorate.Left key="decorate-left" />
          <Main key="main" {...this.props} />
          <Decorate.Right key="decorate-right" />
          <Keyboard key="keyboard" filling={filling} keyboard={this.props.keyboard} />
        </StyledApp>
      </DynamicComponent>
    );
  }
}

App.displayName = 'App';
App.Content = new DynamicContentStore(App.displayName);

App.propTypes = {
  music: propTypes.bool.isRequired,
  pause: propTypes.bool.isRequired,
  matrix: propTypes.object.isRequired,
  next: propTypes.string.isRequired,
  cur: propTypes.object,
  dispatch: propTypes.func.isRequired,
  speedStart: propTypes.number.isRequired,
  speedRun: propTypes.number.isRequired,
  startLines: propTypes.number.isRequired,
  clearLines: propTypes.number.isRequired,
  points: propTypes.number.isRequired,
  max: propTypes.number.isRequired,
  reset: propTypes.bool.isRequired,
  drop: propTypes.bool.isRequired,
  keyboard: propTypes.object.isRequired,
  children: propTypes.any
};

const mapStateToProps = (state) => ({
  pause: state.get('pause'),
  music: state.get('music'),
  matrix: state.get('matrix'),
  next: state.get('next'),
  cur: state.get('cur'),
  speedStart: state.get('speedStart'),
  speedRun: state.get('speedRun'),
  startLines: state.get('startLines'),
  clearLines: state.get('clearLines'),
  points: state.get('points'),
  max: state.get('max'),
  reset: state.get('reset'),
  drop: state.get('drop'),
  keyboard: state.get('keyboard'),
});

export default connect(mapStateToProps)(App);
