import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Box from '@components/Box';
import { useTheme } from '@theme/';
import Typography from '@components/Typography';
import { useDispatch, useSelector } from 'react-redux';
import useTranslation from '@i18n/';
import { getSale } from '../ducks';
import Product from '../components/Product';

function Screen() {
  const $t = useTranslation();
  const dispatch = useDispatch();
  const { sale, saleLoading, saleError, user } = useSelector((state) => state.business);
  const {
    palette: { text: primary },
  } = useTheme();
  const navigation = useNavigation();
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    dispatch(getSale());
  }, []);

  useEffect(() => {
    if (!saleLoading) setIsRefreshing(false);
  }, [saleLoading]);

  const handlePress = (data) => {
    // eslint-disable-next-line no-param-reassign
    data.unread_count = 0;
    navigation.navigate('business-buyers', {
      item: data,
    });
  };

  const renderItem = (row) => {
    const { item } = row;

    return <Product showInteressed data={item} onPress={handlePress} user={user} />;
  };

  const renderItemSeparator = () => <Box p={1} />;

  const keyExtractor = (item) => {
    return String(item.vehicle_id);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    dispatch(getSale());
  };

  if (saleLoading)
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="small" color={primary} />
      </View>
    );

  if (saleError)
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Typography>{$t('unexpectedErrorTryAgain')}</Typography>
      </View>
    );

  return (
    <FlatList
      data={sale}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />}
      ListFooterComponent={renderItemSeparator}
      ListHeaderComponent={renderItemSeparator}
      ItemSeparatorComponent={renderItemSeparator}
    />
  );
}

export default Screen;
