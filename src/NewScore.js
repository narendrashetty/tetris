import React from 'react';
import emotionStyled from "react-emotion";
import Tetris from "./Tetris";

const Container = emotionStyled('div')`
  padding: 20px;
  display: flex;
  flex-direction: column;
  background: #1c1e22;
`;

const Label = emotionStyled('p')`
  color: #fff;
  font-weight: bold;
  margin-bottom: 10px;
`;

const DF = "Points";
const ZDF = 'Highest Score';
const SLDF = 'Last round';

class NewScore extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      label: '',
      number: 0,
    };
  }
  componentWillMount() {
    this.onChange(this.props);
  }

  componentDidUpdate() {
    this.onChange(this.props);
  }

  onChange({ cur, points, max }) {
    this.setState({
      label: points >= max ? ZDF : DF,
      number: points,
    });
  }

  render() {
    return (
      <div style={{ padding: 20 }}>
        <Container>
          <Label>{ this.state.label }</Label>
          <Label>{this.state.number}</Label>
        </Container>

        <Container style={{ marginTop: 4 }}>
          <Label>Next</Label>
          <Tetris.Next {...this.props} />
        </Container>
      </div>
    );
  }
}

export default NewScore;