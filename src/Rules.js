import React from 'react';

export default class Rules extends React.PureComponent {
    render() {
      return (
        <div style={{
          width: 450,
          color: '#fff',
          paddingTop: 200,
          paddingLeft: 50
        }}>
          <h1 style={{ textAlign: 'center' }}>How to play</h1>
          <ul style={{ marginTop: 40 }}>
            <li style={{ marginTop: 10, marginBottom: 10 }}>Call up <h1>+44 7723 452799</h1></li>
            <li style={{ marginTop: 10, marginBottom: 10 }}>Press 2 to change</li>
            <li style={{ marginTop: 10, marginBottom: 10 }}>Press 4 to go left</li>
            <li style={{ marginTop: 10, marginBottom: 10 }}>Press 6 to go right</li>
            <li style={{ marginTop: 10, marginBottom: 10 }}>Press 8 to go down</li>
          </ul>
        </div>
      );
    }
  }