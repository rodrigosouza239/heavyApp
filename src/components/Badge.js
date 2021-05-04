import { useTheme } from '@theme/';
import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Box from './Box';
import Typography from './Typography';

const HEIGHT = 20;

const styles = StyleSheet.create({
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  badge: {
    alignItems: 'center',
    borderRadius: HEIGHT / 2,
    height: HEIGHT,
    justifyContent: 'center',
    minWidth: HEIGHT,
  },
});

function Badge({ count }) {
  const {
    palette: { success },
    spacing,
  } = useTheme();

  return (
    <View style={styles.row}>
      <Box
        style={[
          styles.badge,
          {
            backgroundColor: success.main,
            padding: spacing(0.5),
          },
        ]}
      >
        <Typography variant="caption" color="white">
          {count}
        </Typography>
      </Box>
    </View>
  );
}

Badge.defaultProps = {
  count: 0,
};

Badge.propTypes = {
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default Badge;
