import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { useNavigation, useScrollToTop } from '@react-navigation/native';

import Typography from '@components/Typography';
import Box from '@components/Box';
import { useTheme } from '@theme/';
import { useDispatch, useSelector } from 'react-redux';
import useTranslation from '@i18n/';
import Buyer from './components/Buyer';
import { getSaleVehicle, getVehicle } from './ducks';

function Screen({ route }) {
  const $t = useTranslation();
  const dispatch = useDispatch();
  const { saleVehicle, saleVehicleLoading, saleVehicleError, user } = useSelector(
    (state) => state.business,
  );
  const scroll = React.useRef(null);
  const navigation = useNavigation();

  const [isRefreshing, setIsRefreshing] = useState(false);

  const {
    palette: { text: primary },
  } = useTheme();

  useScrollToTop(scroll);

  useEffect(() => {
    dispatch(getSaleVehicle(route?.params?.item?.vehicle_id));
    dispatch(getVehicle(route?.params?.item?.vehicle_id));
  }, []);

  useEffect(() => {
    if (!saleVehicleLoading) {
      setIsRefreshing(false);
    }
  }, [saleVehicleLoading]);

  const handlePress = (data) => {
    // eslint-disable-next-line no-param-reassign
    data.unread_count = 0;
    navigation.navigate('chat', {
      user: data,
    });
  };

  const renderItem = (row) => {
    const { item } = row;
    return <Buyer data={item} onPress={handlePress} user={user} />;
  };

  const renderItemSeparator = () => <Box p={1} />;

  const keyExtractor = ({ id }) => String(id);

  if (saleVehicleLoading)
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="small" color={primary} />
      </View>
    );

  if (saleVehicleError)
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Typography>{$t('unexpectedErrorTryAgain')}</Typography>
      </View>
    );

  const handleRefresh = () => {
    setIsRefreshing(true);
    dispatch(getSaleVehicle(route?.params?.item?.vehicle_id));
  };

  return (
    <>
      <FlatList
        ref={scroll}
        data={saleVehicle}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />}
        ListFooterComponent={renderItemSeparator}
        ListHeaderComponent={renderItemSeparator}
        ItemSeparatorComponent={renderItemSeparator}
      />
    </>
  );
}

export default Screen;
