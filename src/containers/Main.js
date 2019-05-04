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
import Screen from './Screen';


const Container = emotionStyled('div')`
  margin: 0 !important;
  padding: 20px 30px;
  border: #000 solid;
  border-width: 0 10px 10px;
  margin: 0 auto;
  position: relative;
  overflow-x: visible !important;
  flex-shrink: 0;
  ${props => props.drop && `
    -webkit-transform:translateY(5px);transform:translateY(5px);
  `}
`;

class Main extends React.Component {

  render() {

    return (
      <DynamicComponent
        name={Main.displayName}
        contentStore={Main.Content}
        childProps={this.props}
        customChildren={this.props.children}
      >
          <Container drop={this.props.drop}>
            <Screen key="screen" {...this.props} />
          </Container>
      </DynamicComponent>
    );
  }
}

Main.displayName = 'Main';
Main.Content = new DynamicContentStore(Main.displayName);

export default Main;
