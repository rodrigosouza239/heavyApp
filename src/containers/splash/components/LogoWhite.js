import { withTheme } from '@theme/';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Svg, { Path } from 'react-native-svg';

class Logo extends PureComponent {
  render() {
    const {
      height,
      symbolColor,
      showSymbol,
      showText,
      textColor,
      width,
      style,
      theme,
      ...rest
    } = this.props;

    const {
      palette: {
        common: { white },
      },
    } = theme;

    const computedSymbolColor = symbolColor || white;
    const computedTextColor = textColor || white;

    return (
      <Svg style={[{ width, height }, style]} viewBox={`0 0 ${width} ${height}`} {...rest}>
        {showSymbol && (
          <Path
            d="M82.7 0H18.5l-3.4 10-6.5 18.9-.4 1.3-1.8 5.4-1.6 4.6-3.3 9.6L.4 53c-.2.5-.2 1-.3 1.4v.4c0 .1 0 .2.1.3 0 .1.1.2.1.3 0 .2.1.3.2.4.2.4.5.7.8.9l2.2 1.6 25.7 18.6 7.6-3.6 30.9-14.9 2.2-1L71 57c.4-.2.8-.4 1.2-.7 1.1-.8 1.9-1.9 2.4-3.1l1.1-3.2 2.7-7.8.6-1.8 1.6-4.6.9-2.7.9-2.7.4-1.3 2-6 4.5-13 3.4-10-10-.1zM25.1 10H47l-1 3-1.2 3.5h10.5l.6-1.8 1.6-4.7h21.9l-1.7 4.9-5.3 15.6h-22l1.7-4.9.6-1.6H42.1L41 27.4l-1 3.1H18.1l2.1-6.1L25.1 10zm40.7 38.9c-.3.5-.7 1-1.1 1.4-.2.2-.3.3-.5.4-.4.4-.9.7-1.4.9L40 62.3l-.6.3 4.1-11.9-7 5.1-2-2.9-1.5-2.2-4.1 11.9-7.9-5.5-8-5.5c-.1 0-.1-.1-.2-.2l-.3-.3c-.2-.2-.4-.5-.5-.8-.1-.3-.2-.7-.2-1V49c0-.4.1-.7.2-1.1l4.3-12.4h21.9l.2.3 3.3 4.8 2.3-1.7 4.7-3.4h21.9l-4.3 12.4c0 .1-.1.2-.1.3 0 .1-.1.2-.1.3-.1.1-.2.3-.3.4z"
            fill={computedSymbolColor}
          />
        )}
        {showText && (
          <Path
            fill={computedTextColor}
            d="M125.6 40.7h-23.2l-7.2 20.8h7.5l5-14.6h4l-5 14.6h7.4l5-14.6h2c1.6 0 2 .6 1.5 1.9l-4.4 12.7h7.4l5-14.5c1.6-4.1.1-6.3-5-6.3zM152.9 40.7h-6.2c-7.2 0-11.2 3.2-13.7 10.4s-.7 10.4 6.5 10.4h6.2c7.2 0 11.2-3.1 13.7-10.4 2.5-7.2.7-10.4-6.5-10.4zm-1.1 10.4c-1.1 3.1-2.3 4.5-6.2 4.5h-2c-3.7 0-4-1.4-2.9-4.5s2.3-4.5 6-4.5h2c3.9 0 4.2 1.4 3.1 4.5zM206.9 40.7h-6.2c-7.2 0-11.2 3.2-13.7 10.4s-.7 10.4 6.5 10.4h6.2c7.2 0 11.2-3.1 13.7-10.4 2.5-7.2.7-10.4-6.5-10.4zm-1.1 10.4c-1.1 3.1-2.3 4.5-6.2 4.5h-2c-3.7 0-4-1.4-2.9-4.5s2.3-4.5 6-4.5h2c3.9 0 4.2 1.4 3.1 4.5zM254.9 46.7H268l2-6h-14.8c-5.3 0-8.1 1.7-9.6 6.1-1.4 4.2 0 6.5 4.9 6.5h6.6c.9 0 1.3.2 1 1.1-.2.8-1 1.3-1.8 1.2H243l-2 5.9h16c4.4 0 7.3-1.9 8.9-6.5 1.4-4.1.3-6.1-4.6-6.1h-7.2c-.9 0-1.2-.4-.9-1.1.2-.7.9-1.2 1.7-1.1zM241.6 48c1.7-5 .9-7.3-5-7.3h-15.8l-7.2 20.8h7.5l5.3-15.4h6.3c1.4 0 1.8.3 1.3 1.6-.2 1.1-1.3 1.9-2.5 1.7h-3.4c-1.6 0-3.2 1.9-2.7 3.2l1 2.6 2.5 6.3h9l-3.3-6.8c3.7-1 5.7-2.9 7-6.7zM165.1 40.7l-2.1 6.1h8.1L166 61.5h7.6l5.1-14.7h7.2l2.1-6.1h-22.9zM198.1 36.5l16-20.8h-8.3L199 25c-1.9 2.7-3 4.2-3.9 5.6h-.1c.1-1.4.1-3 .1-5.6l-.2-9.3h-8.6l1.5 20.8h10.3zM114.1 28.8h8.2l-2.6 7.7h7.6l7.2-20.8h-7.7l-2.4 7h-8.2l2.4-7H111l-7.2 20.8h7.6l2.7-7.7zM155 30.7h-14.1l.7-2.1h14l1.8-5.2h-14l.7-1.9h14.1l2-5.8h-21.4l-7.2 20.8H153l2-5.8zM164.4 36.5l2.8-3.9h7.9l.1 3.9h8.3l-1.7-20.8h-10.3l-15.8 20.8h8.7zm6.6-9.3c1.9-2.7 2.9-4.2 3.8-5.6h.1c-.1 1.9-.1 3.8 0 5.6v.2h-4l.1-.2zM217.8 36.5h7.6l2.8-8.1 13.5-12.6h-8.1l-7 6.6h-.1l-2.3-6.6h-8.3l4.8 12.6-2.9 8.1z"
          />
        )}
      </Svg>
    );
  }
}

Logo.defaultProps = {
  height: 77.2,
  showSymbol: true,
  showText: true,
  style: null,
  symbolColor: null,
  textColor: null,
  width: 270,
};

Logo.propTypes = {
  height: PropTypes.number,
  showSymbol: PropTypes.bool,
  showText: PropTypes.bool,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  symbolColor: PropTypes.string,
  textColor: PropTypes.string,
  theme: PropTypes.object.isRequired,
  width: PropTypes.number,
};

export default withTheme(Logo);
