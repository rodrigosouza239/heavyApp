import React from 'react';
import Box from '@components/Box';
import Typography from '@components/Typography';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

function Definition({ label, value, isLast }) {
  const hasLabel = `${label}`.length > 0;
  const hasValue = `${value}`.length > 0;
  const hasContent = hasLabel || hasValue;

  return (
    hasContent && (
      <Box mb={isLast ? 0 : 1} style={styles.root}>
        {hasLabel && <Typography color="textSecondary">{label}</Typography>}
        {hasValue && (
          <Typography fontWeight="bold" color="textSecondary">
            {value}
          </Typography>
        )}
      </Box>
    )
  );
}

Definition.defaultProps = {
  isLast: false,
  label: '',
  value: '',
};

Definition.propTypes = {
  isLast: PropTypes.bool,
  label: PropTypes.string,
  value: PropTypes.string,
};

export default Definition;
