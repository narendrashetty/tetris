import React from 'react';
import emotionStyled from "react-emotion";

const StyledCell = emotionStyled('div')`
  background: #1c1e22;
  width: 40px;
  height: 40px;
  float: left;
`;

const StyledActiveCell = emotionStyled('div')`
  background: #ff8133;
  width: 40px;
  height: 40px;
  float: left;
  border: 1px solid #1c1e22;
`;

const StyledDeadCell = emotionStyled('div')`
  background: red;
  width: 40px;
  height: 40px;
  float: left;
  border: 1px solid #1c1e22;
`;


export default class NewCell extends React.PureComponent {
    render() {
      if (this.props.status === 'active') {
        return (
          <StyledActiveCell />
        );
      } else if (this.props.status === 'dead') {
        return (
          <StyledDeadCell />
        );
      }
      return (
        <StyledCell />
      );
    }
  }