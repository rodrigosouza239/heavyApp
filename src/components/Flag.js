import PropTypes from 'prop-types';
import React from 'react';
import { Image, StyleSheet } from 'react-native';

const brImage = require('@assets/images/br.png');
const usImage = require('@assets/images/us.png');

const styles = StyleSheet.create({
  image: {
    width: 28,
    height: 28,
  },
});

const mapLanguage = {
  br: brImage,
  us: usImage,
};

function Flag({ country }) {
  return <Image source={mapLanguage[country]} style={styles.image} />;
}

Flag.defaultProps = {
  country: 'br',
};

Flag.propTypes = {
  country: PropTypes.oneOf(['us', 'br']),
};

export default Flag;
