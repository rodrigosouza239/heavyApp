import Box from '@components/Box';
import Icon from '@components/Icon';
import ListItem from '@components/ListItem';
import Typography from '@components/Typography';
import React from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  root: {
    display: 'flex',
    flexDirection: 'row',
  },
  arrow: {
    justifyContent: 'center',
  },
});

function Item({ component, data, onPress }) {
  const handlePress = () => {
    if (onPress) {
      onPress(data);
    }
  };

  return (
    component || (
      <ListItem onPress={handlePress} size="auto">
        <Box py={2} style={styles.root}>
          <Box mr={1} style={styles.flex}>
            <Typography gutterBottom variant="subtitle" color="textSecondary">
              {data?.title}
            </Typography>
            <Typography color="textSecondary">{data?.subtitle}</Typography>
          </Box>
          <Box style={styles.arrow}>
            <Icon size={20} name="arrow-circle" />
          </Box>
        </Box>
      </ListItem>
    )
  );
}

Item.defaultProps = {
  component: null,
  onPress: null,
  data: null,
};

Item.propTypes = {
  component: PropTypes.element,
  data: PropTypes.shape({
    title: PropTypes.string,
    subtitle: PropTypes.string,
  }),
  onPress: PropTypes.func,
};

export default Item;
