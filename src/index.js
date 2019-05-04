import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './containers/';
import Screen from './containers/Screen';
import Cell from './components/Cell';
import Logo from './components/logo';
import './unit/const';
import './control';
import { subscribeRecord } from './unit';
import Matrix from './components/matrix';
import Next from './components/next';

subscribeRecord(store); // 将更新的状态记录到localStorage

class NewCell extends React.PureComponent {
  render() {
    if (this.props.status === 'active') {
      return (
        <span style={{
          border: '1px solid #1c1e22',
          background: '#ff8133',
          width: 40,
          height: 40,
          float: 'left'
        }}></span>
      );
    } else if (this.props.status === 'dead') {
      return (
        <span style={{
          border: '1px solid #1c1e22',
          background: 'red',
          width: 40,
          height: 40,
          float: 'left'
        }}></span>
      );
    }
    return (
      <span style={{
        background: '#1c1e22',
        width: 40,
        height: 40,
        float: 'left'
      }}></span>
    );
  }
}

class Rules extends React.PureComponent {
  render() {
    return (
      <div style={{
        width: 450,
        color: '#fff',
        padding: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <h1 style={{ textAlign: 'center' }}>How to play</h1>
        <ul style={{ marginTop: 70 }}>
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
  componentWillReceiveProps(nextProps) {
    this.onChange(nextProps);
  }
  shouldComponentUpdate({ cur, points, max }) {
    const props = this.props;
    return cur !== props.cur || points !== props.points || max !== props.max || !props.cur;
  }
  onChange({ cur, points, max }) {
    clearInterval(NewScore.timeout);
    if (cur) { // 在游戏进行中
      this.setState({
        label: points >= max ? ZDF : DF,
        number: points,
      });
    } else { // 游戏未开始
      const toggle = () => { // 最高分与上轮得分交替出现
        this.setState({
          label: SLDF,
          number: points,
        });
        NewScore.timeout = setTimeout(() => {
          this.setState({
            label: ZDF,
            number: max,
          });
          NewScore.timeout = setTimeout(toggle, 3000);
        }, 3000);
      };

      if (points !== 0) { // 如果为上轮没玩, 也不用提示了
        toggle();
      } else {
        this.setState({
          label: ZDF,
          number: max,
        });
      }
    }
  }
  render() {
    return (
      <div style={{
        padding: 20,
      }}>
        <div style={{
          padding: 20,
          display: 'flex',
          flexDirection: 'column',
          background: '#1c1e22',
        }}>
          <p style={{
            color: '#fff',
            fontWeight: 'bold',
            marginBottom: 10
          }}>{ this.state.label }</p>
          <p style={{
            color: '#fff',
            fontWeight: 'bold',
            marginBottom: 10
          }}>{this.state.number}</p>
        </div>

        <div style={{
          padding: 20,
          display: 'flex',
          marginTop: 4,
          flexDirection: 'column',
          background: '#1c1e22',
        }}>
          <p style={{
            color: '#fff',
            fontWeight: 'bold',
            marginBottom: 10
          }}>{ this.props.cur ? "Cleans" : "Start Line" }</p>
          <p style={{
            color: '#fff',
            fontWeight: 'bold',
            marginBottom: 10
          }}>{this.props.cur ? this.props.clearLines : this.props.startLines}</p>
        </div>

        <div style={{
          padding: 20,
          display: 'flex',
          marginTop: 4,
          flexDirection: 'column',
          background: '#1c1e22',
        }}>
          <p style={{
            color: '#fff',
            fontWeight: 'bold',
            marginBottom: 10
          }}>Level</p>
          <p style={{
            color: '#fff',
            fontWeight: 'bold',
            marginBottom: 10
          }}>{this.props.cur ? this.props.speedRun : this.props.speedStart}</p>
        </div>

        <div style={{
          padding: 20,
          marginTop: 4,
          display: 'flex',
          flexDirection: 'column',
          background: '#1c1e22',
        }}>
          <p style={{
            color: '#fff',
            fontWeight: 'bold',
            marginBottom: 10
          }}>Next</p>
          <Next {...this.props} />
        </div>
      </div>
    );
  }
}

NewScore.timeout = null;

Cell.Content.remove('cell');
Cell.Content.add(<NewCell key="c" />);

App.Content.remove('keyboard');
App.Content.remove('decorate-left');
App.Content.remove('decorate-right');
App.Content.remove('main');


App.Content.add(<Matrix key="matrix1" />);
App.Content.add(<NewScore key="next" />);

App.Content.add(<Rules key="rules" />, { sortOrder: -1 });

render(
  <Provider store={store}>
    <App />
  </Provider>
    , document.getElementById('root')
);

