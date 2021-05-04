import Box from '@components/Box';
import Card from '@components/Card';
import Container from '@components/Container';
import Icon, { iconNames } from '@components/Icon';
import Typography from '@components/Typography';
import { useTheme } from '@theme/';
import PropTypes from 'prop-types';
import React from 'react';

function SquareButton({ children, containerProps, icon, onPress, style }) {
  const {
    shape: { borderRadius },
  } = useTheme();

  const containerStyles = {
    borderRadius,
    overflow: 'hidden',
  };

  return (
    <Card onPress={onPress} containerProps={{ px: 0, ...containerProps }} style={style}>
      <Container style={containerStyles} pb={3}>
        <Icon size={36} name={icon} />
        <Box pt={2}>
          <Typography variant="h6" color="textSecondary">
            {children}
          </Typography>
        </Box>
      </Container>
    </Card>
  );
}

SquareButton.defaultProps = {
  children: '',
  containerProps: null,
  icon: 'search',
  onPress: null,
  style: null,
};

SquareButton.propTypes = {
  children: PropTypes.node,
  containerProps: PropTypes.object,
  icon: PropTypes.oneOf(iconNames),
  onPress: PropTypes.func,
  style: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default SquareButton;
