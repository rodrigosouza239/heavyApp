import React, { useCallback } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import useTranslation from '@i18n/';
import { useSelector } from 'react-redux';
import SelectBox from './components/SelectBox';

const OrderScreen = ({ navigation }) => {
  const { filters } = useSelector((state) => state.search);
  const $t = useTranslation();

  const handlePress = useCallback((orderby, sortby) => {
    navigation.navigate('search-results', {
      filter: {
        ...filters,
        orderby,
        sortby,
      },
    });
  }, []);

  const boxes = [
    { title: 'more-relevant', orderby: 'views', sortby: 'desc' },
    { title: 'year-recent', orderby: 'fabrication_year', sortby: 'desc' },
    { title: 'lower-trail-hours', orderby: 'trackhours', sortby: 'asc' },
    { title: 'lower-engine-hours', orderby: 'motorhours', sortby: 'asc' },
    { title: 'lower-mileage', orderby: 'mileage', sortby: 'asc' },
    { title: 'recent-created', orderby: 'vehicle.created_at', sortby: 'asc' },
    { title: 'lower-price', orderby: 'price', sortby: 'asc' },
  ];

  return (
    <View>
      {boxes.map(({ title, orderby, sortby }) => (
        <SelectBox
          key={title}
          title={$t(`${title}`)}
          onPress={() => handlePress(orderby, sortby)}
        />
      ))}
    </View>
  );
};

OrderScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default OrderScreen;
