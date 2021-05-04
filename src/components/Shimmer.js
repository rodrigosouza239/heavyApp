import { withTheme } from '@theme/';
import random from 'lodash/random';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Animated, View } from 'react-native';

class Shimmer extends PureComponent {
  constructor() {
    super();

    this.animatedOpacity = new Animated.Value(0);

    this.state = {
      opacityValue: 0,
    };
  }

  componentDidMount() {
    this.animate();

    this.intervalId = setInterval(() => {
      this.animate();
    }, 800);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  animate = () => {
    const { opacityValue } = this.state;

    return Animated.timing(this.animatedOpacity, {
      toValue: opacityValue,
      duration: 300,
      useNativeDriver: true,
    }).start(() => this.setState({ opacityValue: opacityValue === 0 ? 1 : 0 }));
  };

  renderChildrens(element) {
    return React.Children.map(element, (child) => {
      const { style } = child.props;

      const {
        backgroundColor,
        theme: {
          palette: { divider },
        },
      } = this.props;

      const key = random(0, Number.MAX_SAFE_INTEGER, false);

      if (child.props.children) {
        return (
          <View
            key={key}
            style={{
              ...style,
            }}
          >
            {this.renderChildrens(child.props.children)}
          </View>
        );
      }

      return <View key={key} style={[style, { backgroundColor: backgroundColor || divider }]} />;
    });
  }

  render() {
    const { maxOpacity, minOpacity, children } = this.props;

    return (
      <Animated.View
        style={{
          opacity: this.animatedOpacity.interpolate({
            inputRange: [0, 1],
            outputRange: [maxOpacity, minOpacity],
          }),
        }}
      >
        {this.renderChildrens(children)}
      </Animated.View>
    );
  }
}

Shimmer.defaultProps = {
  backgroundColor: null,
  children: null,
  maxOpacity: 1,
  minOpacity: 0.5,
};

Shimmer.propTypes = {
  backgroundColor: PropTypes.string,
  children: PropTypes.node,
  maxOpacity: PropTypes.number,
  minOpacity: PropTypes.number,
  theme: PropTypes.object.isRequired,
};

export default withTheme(Shimmer);
