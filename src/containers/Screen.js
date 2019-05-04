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

const SScreen = emotionStyled('div')`
  border: solid 5px;
  border-color: #987f0f #fae36c #fae36c #987f0f;
  margin: 0 auto;
  position: relative;
`;

const Panel = emotionStyled('div')`
  margin: 0 auto;
  background: #9ead86;
  padding: 8px;
  border: 2px solid #494536;
`;

const State = emotionStyled('div')`
  padding: 0 10px;
  min-width: 140px;
  p {
    line-height: 47px;
    height: 57px;
    padding: 10px 0 0;
    white-space: nowrap;
    clear: both;
  }
`;

const Bottom = emotionStyled('div')`
  position: absolute;
  width: 114px;
  top: 426px;
  right: 10px;
`;
class Screen extends React.Component {

  render() {

    return (
      <SScreen>
        <DynamicComponent
          name={Screen.displayName}
          contentStore={Screen.Content}
          childProps={this.props}
          customChildren={this.props.children}
        >
          <Panel>
            <Matrix
              matrix={this.props.matrix}
              cur={this.props.cur}
              reset={this.props.reset}
              key="matrix"
            />
            <Logo cur={!!this.props.cur} reset={this.props.reset} key="logo" />
            <State key="state">
              <Point cur={!!this.props.cur} point={this.props.points} max={this.props.max} />
              <p>{ this.props.cur ? i18n.cleans[lan] : i18n.startLine[lan] }</p>
              <Number number={this.props.cur ? this.props.clearLines : this.props.startLines} />
              <p>{i18n.level[lan]}</p>
              <Number
                number={this.props.cur ? this.props.speedRun : this.props.speedStart}
                length={1}
              />
              <p>{i18n.next[lan]}</p>
              <Next next={this.props.next} />
              <Bottom>
                <Music data={this.props.music} />
                <Pause data={this.props.pause} />
                <Number time />
              </Bottom>
            </State>
          </Panel>
        </DynamicComponent>
      </SScreen>
    );
  }
}

Screen.displayName = 'Screen';
Screen.Content = new DynamicContentStore(Screen.displayName);

export default Screen;
