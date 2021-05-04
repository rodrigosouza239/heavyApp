import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { useNavigation, useScrollToTop } from '@react-navigation/native';

import Box from '@components/Box';
import { useTheme } from '@theme/';
import Typography from '@components/Typography';

import { useDispatch, useSelector } from 'react-redux';
import useTranslation from '@i18n/';
import { getPurchare } from '../ducks';
import Product from '../components/Product';

function Screen() {
  const $t = useTranslation();
  const dispatch = useDispatch();
  const { purchare, purchareLoading, purchareError, user } = useSelector((state) => state.business);
  const scroll = React.useRef(null);
  const navigation = useNavigation();
  const {
    palette: { text: primary },
  } = useTheme();

  const [isRefreshing, setIsRefreshing] = useState(false);

  useScrollToTop(scroll);

  useEffect(() => {
    dispatch(getPurchare());
  }, []);

  useEffect(() => {
    if (!purchareLoading) {
      setIsRefreshing(false);
    }
  }, [purchareLoading]);

  const handlePress = (data) => {
    data.unread_count = 0;
    navigation.navigate('chat', {
      item: data,
    });
  };

  const renderItem = (row) => {
    const { item } = row;

    return <Product data={item} onPress={handlePress} user={user} />;
  };

  const renderItemSeparator = () => <Box p={1} />;

  const keyExtractor = (row) => {
    return String(row.vehicle_id);
  };

  if (purchareLoading)
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="small" color={primary} />
      </View>
    );

  if (purchareError)
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Typography>{$t('unexpectedErrorTryAgain')}</Typography>
      </View>
    );

  const handleRefresh = () => {
    setIsRefreshing(true);
    dispatch(getPurchare());
  };

  return (
    <FlatList
      ref={scroll}
      data={purchare}
      refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ListFooterComponent={renderItemSeparator}
      ListHeaderComponent={renderItemSeparator}
      ItemSeparatorComponent={renderItemSeparator}
    />
  );
}

export default Screen;
