import Checkbox from '@components/CheckBox';
import ListItem from '@components/ListItem';
import Typography from '@components/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
});

function Item({ data, onPress }) {
  const { checked, text } = data;

  const handlePress = () => {
    if (onPress) {
      onPress(data);
    }
  };

  return (
    <ListItem
      onPress={handlePress}
      size="medium"
      boxProps={{ px: 0 }}
      style={styles.row}
      selected={checked}
    >
      <Checkbox onPress={handlePress} checked={checked} />
      <Typography>{text}</Typography>
    </ListItem>
  );
}

Item.propTypes = {
  data: PropTypes.shape({
    checked: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  onPress: PropTypes.func.isRequired,
};

export default Item;
