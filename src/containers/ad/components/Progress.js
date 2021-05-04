import Box from '@components/Box';
import { ActionButton } from '@components/Button';
import ProgressBar from '@components/ProgressBar';
import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center',
  },
});

const allPagesLength = 11;

function Progress({ description, currentStep, progress, pageIndex }) {
  const stepsMap = {
    first: [false, true, true],
    second: [true, false, true],
    third: [true, true, false],
  };

  const computedStep = stepsMap[currentStep];

  return (
    <>
      <ProgressBar progress={pageIndex ? pageIndex / allPagesLength : progress} />
      <Box pt={2} pb={2} style={styles.root}>
        <ActionButton
          disabled={computedStep[0]}
          color="white"
          size="small"
          name="hand-holding-usd"
        />
        <Box ml={2} mr={2}>
          <ActionButton disabled={computedStep[1]} color="white" size="small" name="camera" />
        </Box>
        <ActionButton
          disabled={computedStep[2]}
          color="white"
          size="small"
          name="file-invoice-dollar"
        />
      </Box>
      {description && <Box mb={2}>{description}</Box>}
    </>
  );
}

Progress.defaultProps = {
  currentStep: 'first',
  description: null,
  progress: 0.5,
  pageIndex: null,
};

Progress.propTypes = {
  currentStep: PropTypes.oneOf(['first', 'second', 'third']),
  description: PropTypes.element,
  progress: PropTypes.number,
  pageIndex: PropTypes.number,
};

export default Progress;
