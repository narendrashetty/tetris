import React from 'react';
import cn from 'classnames';
import emotionStyled from "react-emotion";

import { i18n, lan } from '../../unit/const';
import Cell from '../Cell';

const SDecorate = emotionStyled('div')`
  width: 120px;
  h1{
    position: absolute;
    width: 100%;
    text-align: center;
    font-weight: normal;
    top: -12px;
    left: 0;
    margin: 0;
    padding: 0;
    font-size: 30px;
  }
  .topBorder{
    position:absolute;
    height:10px;
    width:100%;
    position:absolute;
    top:0px;
    left:0px;
    overflow:hidden;
    span{
      display:block;
      width:10px;
      height:10px;
      overflow:hidden;
      background:#000;
      &.mr{
        margin-right:10px;
      }
      &.ml{
        margin-left:10px;
      }
    }
  }
  .view{
    width: 90px;
    margin: 0 auto;
    padding: 0 10px;
    p {
      height: 22px;
      clear: both;
    }
    &.l{
      right: auto;
      left: -70px;
    }
  }
`;

export default class Decorate extends React.Component {
  shouldComponentUpdate() {
    return false;
  }
  render() {
    return (
      <SDecorate className="decorate">
        <div className="topBorder">
        <span className="l mr" style={{ width: 40 }} />
          <span className="l mr" />
          <span className="l mr" />
          <span className="l mr" />
          <span className="l mr" />

          <span className="r ml" style={{ width: 40 }} />
          <span className="r ml" />
          <span className="r ml" />
          <span className="r ml" />
          <span className="r ml" />
        </div>
        <h1>{i18n.title[lan]}</h1>
      </SDecorate> 
    );
  }
}

class DecorateLeft extends React.Component {
  shouldComponentUpdate() {
    return false;
  }
  render() {
    return (
      <SDecorate className="decorate">
        <div className="view">
          <Cell />
          <Cell status="active" />
          <div className="clear" />
          <Cell status="active" />
          <Cell status="active" />
          <div className="clear" />
          <Cell status="active" />
          <p />
          <Cell status="active" />
          <div className="clear" />
          <Cell status="active" />
          <Cell status="active" />
          <div className="clear" />
          <Cell status="active" />
          <p />
          <Cell status="active" />
          <Cell status="active" />
          <Cell status="active" />
          <Cell status="active" />
          <p />
          <Cell />
          <Cell status="active" />
          <div className="clear" />
          <Cell status="active" />
          <Cell status="active" />
          <div className="clear" />
          <Cell />
          <Cell status="active" />
          <p />
          <Cell status="active" />
          <Cell status="active" />
          <div className="clear" />
          <Cell />
          <Cell status="active" />
          <div className="clear" />
          <Cell />
          <Cell status="active" />
          <p />
          <Cell status="active" />
          <div className="clear" />
          <Cell status="active" />
          <div className="clear" />
          <Cell status="active" />
          <div className="clear" />
          <Cell status="active" />
        </div>
        </SDecorate>
    );
  }
}


class DecorateRight extends React.Component {
  shouldComponentUpdate() {
    return false;
  }
  render() {
    return (
      <SDecorate className="decorate">
      <div className="view">
          <Cell status="active" />
          <div className="clear" />
          <Cell status="active" />
          <Cell status="active" />
          <div className="clear" />
          <Cell />
          <Cell status="active" />
          <p />
          <Cell />
          <Cell status="active" />
          <div className="clear" />
          <Cell status="active" />
          <Cell status="active" />
          <div className="clear" />
          <Cell />
          <Cell status="active" />
          <p />
          <Cell status="active" />
          <Cell status="active" />
          <Cell status="active" />
          <Cell status="active" />
          <p />
          <Cell status="active" />
          <div className="clear" />
          <Cell status="active" />
          <Cell status="active" />
          <div className="clear" />
          <Cell status="active" />
          <p />
          <Cell status="active" />
          <Cell status="active" />
          <div className="clear" />
          <Cell status="active" />
          <div className="clear" />
          <Cell status="active" />
          <p />
          <Cell />
          <Cell status="active" />
          <div className="clear" />
          <Cell />
          <Cell status="active" />
          <div className="clear" />
          <Cell />
          <Cell status="active" />
          <div className="clear" />
          <Cell />
          <Cell status="active" />
      </div>
      </SDecorate>
    );
  }
}

Decorate.Left = DecorateLeft;
Decorate.Right = DecorateRight;