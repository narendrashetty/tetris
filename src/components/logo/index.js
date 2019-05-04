import React from 'react';
import cn from 'classnames';
import propTypes from 'prop-types';
import emotionStyled from "react-emotion";
import { DynamicComponent } from '@twilio/frame-ui/DynamicComponent';
import { DynamicContentStore } from '@twilio/frame-ui/DynamicContentStore';

import style from './index.less';
import { i18n, lan } from '../../unit/const';

const SLogo = emotionStyled('div')`
  width: 224px;
  height: 200px;
  position: absolute !important;
  top: 100px;
  left: 0;
  text-align: center;
  overflow: hidden;
  p {
    position: absolute;
    width: 100%;
    line-height: 1.4;
    top: 100px;
    left: 0;
    font-family: initial;
    letter-spacing: 6px;
    text-shadow: 1px 1px 1px rgba(255, 255, 255,.35);
  }
  .dragon {
    width: 80px;
    height: 86px;
    margin: 0 auto;
    background-position: 0 -100px;
    &.r1,&.l1 {
      background-position: 0 -100px;
    }
    &.r2,&.l2 {
      background-position: -100px -100px;
    }
    &.r3,&.l3 {
      background-position: -200px -100px;
    }
    &.r4,&.l4 {
      background-position: -300px -100px;
    }
    &.l1,&.l2,&.l3,&.l4{
      transform: scale(-1, 1);
      -webkit-transform: scale(-1, 1);
      -ms-transform: scale(-1, 1);
      -moz-transform: scale(-1, 1);
      -o-transform: scale(-1, 1);
    }
  }
`;

export default class Logo extends React.Component {
  constructor() {
    super();
    this.state = {
      style: 'r1',
      display: 'none',
    };
  }
  componentWillMount() {
    this.animate(this.props);
  }
  componentWillReceiveProps(nextProps) {
    if ( // 只有在游戏进入开始, 或结束时 触发改变
      (
        [this.props.cur, nextProps.cur].indexOf(false) !== -1 &&
        (this.props.cur !== nextProps.cur)
      ) ||
      (this.props.reset !== nextProps.reset)
    ) {
      this.animate(nextProps);
    }
  }
  shouldComponentUpdate({ cur, reset }) {
    return cur !== this.props.cur || reset !== this.props.reset || !cur;
  }
  animate({ cur, reset }) {
    clearTimeout(Logo.timeout);
    this.setState({
      style: 'r1',
      display: 'none',
    });
    if (cur || reset) {
      this.setState({ display: 'none' });
      return;
    }

    let m = 'r'; // 方向
    let count = 0;

    const set = (func, delay) => {
      if (!func) {
        return;
      }
      Logo.timeout = setTimeout(func, delay);
    };

    const show = (func) => { // 显示
      set(() => {
        this.setState({
          display: 'block',
        });
        if (func) {
          func();
        }
      }, 150);
    };

    const hide = (func) => { // 隐藏
      set(() => {
        this.setState({
          display: 'none',
        });
        if (func) {
          func();
        }
      }, 150);
    };

    const eyes = (func, delay1, delay2) => { // 龙在眨眼睛
      set(() => {
        this.setState({ style: m + '2' });
        set(() => {
          this.setState({ style: m + '1' });
          if (func) {
            func();
          }
        }, delay2);
      }, delay1);
    };

    const run = (func) => { // 开始跑步啦！
      set(() => {
        this.setState({ style: m + '4' });
        set(() => {
          this.setState({ style: m + '3' });
          count++;
          if (count === 10 || count === 20 || count === 30) {
            m = m === 'r' ? 'l' : 'r';
          }
          if (count < 40) {
            run(func);
            return;
          }
          this.setState({ style: m + '1' });
          if (func) {
            set(func, 4000);
          }
        }, 100);
      }, 100);
    };

    const dra = () => {
      count = 0;
      eyes(() => {
        eyes(() => {
          eyes(() => {
            this.setState({ style: '.' + m + '2' });
            run(dra);
          }, 150, 150);
        }, 150, 150);
      }, 1000, 1500);
    };

    show(() => { // 忽隐忽现
      hide(() => {
        show(() => {
          hide(() => {
            show(() => {
              dra(); // 开始运动
            });
          });
        });
      });
    });
  }
  render() {
    if (this.props.cur) {
      return null;
    }
    return (
      <DynamicComponent
        name={Logo.displayName}
        contentStore={Logo.Content}
        childProps={this.props}
        customChildren={this.props.children}
      >
        <SLogo style={{ display: this.state.display }}>
          <div key="1" className={`bg dragon ${this.state.style}`} />
          <p key="2" dangerouslySetInnerHTML={{ __html: i18n.titleCenter[lan] }} />
        </SLogo>
      </DynamicComponent>
    );
  }
}

Logo.displayName = 'Logo';
Logo.Content = new DynamicContentStore(Logo.displayName);

Logo.propTypes = {
  cur: propTypes.bool,
  reset: propTypes.bool.isRequired,
};
Logo.statics = {
  timeout: null,
};
