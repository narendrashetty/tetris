import React from 'react';
import classnames from 'classnames';
import emotionStyled from "react-emotion";
import { DynamicComponent } from '@twilio/frame-ui/DynamicComponent';
import { DynamicContentStore } from '@twilio/frame-ui/DynamicContentStore';
import { withDefaultPropsUpdate } from '@twilio/frame-ui/withDefaultPropsUpdate';

const Container = emotionStyled('span')`
  display: inline !important;
`;

class Cell extends React.PureComponent {
  render() {
    const className = classnames({
      c: this.props.status === 'active',
      d: this.props.status === 'dead',
    });
    return (
      <DynamicComponent
        name={Cell.displayName}
        contentStore={Cell.Content}
        childProps={this.props}
        customChildren={this.props.children}
        noContainers
      >
      <Container>
        <b
          className={className}
          key="cell"
        />
      </Container>
      </DynamicComponent>
    );
  }
}

Cell.displayName = 'Cell';
Cell.Content = new DynamicContentStore(Cell.displayName);
Cell.add = (...args) => Cell.Content.add(...args);
Cell.remove = (...args) => Cell.Content.remove(...args);
Cell.replace = (...args) => Cell.Content.replace(...args);

Cell.defaultProps = {
  a: false
};

export default Cell;