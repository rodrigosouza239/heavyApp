/* eslint-disable react/prop-types */
import Box from '@components/Box';
import Card from '@components/Card';
import Price from '@components/Product/Price';
import { useTheme } from '@theme/';
import PropTypes from 'prop-types';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Typography from '@components/Typography';
import { useMaskedPrice } from '@utils/index';
import useTranslation from '@i18n/';

function Item({ data, onPress, user, showInteressed }) {
  const $t = useTranslation();
  const {
    shape: { borderRadius },
    palette,
  } = useTheme();

  const imageStyles = {
    width: 90,
    height: 90,
    borderRadius,
    overflow: 'hidden',
  };

  const styles = StyleSheet.create({
    row: {
      display: 'flex',
      flexDirection: 'row',
    },
    flex: {
      flex: 1,
    },
    priceTimeHolder: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    countText: {
      borderRadius: 100,
      backgroundColor: palette.lightGreen.main,
      width: 30,
      height: 30,
      justifyContent: 'center',
      alignItems: 'center',
    },
    flexRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    unreadContainer: {
      alignItems: 'flex-end',
      paddingRight: 20,
    },
    unread: {
      backgroundColor: palette.lightGreen.main,
      borderRadius: 50,
      width: 25,
      height: 25,
    },
    textCenter: {
      paddingTop: 2,
      textAlign: 'center',
      textAlignVertical: 'center',
    },
  });

  const handlePress = () => {
    if (typeof onPress === 'function') {
      onPress(data);
    }
  };

  const [count, setCount] = useState(0);

  const countMessages = () => {
    if (user) {
      // eslint-disable-next-line array-callback-return
      user?.map((item) => {
        if (item?.vehicle?.find((e) => e === data?.vehicle_id)) setCount(count + 1);
      });
    }
  };

  useEffect(() => {
    countMessages();
  }, []);

  const renderSubstring = (string) => {
    return string?.length >= 60 ? `${string?.substring(0, 60)}...` : string;
  };

  const renderLastMessage = () => {
    return data?.last_event?.event?.text ? renderSubstring(data?.last_event?.event?.text) : '...';
  };

  return (
    <Card onPress={handlePress}>
      <Box p={2} style={styles.row}>
        <Box mr={2}>
          <View style={imageStyles}>
            <Image
              style={imageStyles}
              resizeMode="cover"
              source={{ uri: data?.thumbnail || undefined }}
            />
          </View>
        </Box>
        <View style={styles.flex}>
          <Box mb={0.5} style={styles.row}>
            <View style={[styles.flex, { flexDirection: 'row', justifyContent: 'space-between' }]}>
              <Typography
                variant="subtitle"
                color="textSecondary"
                style={{ flex: 1, flexWrap: 'wrap' }}
              >
                {data?.short_description}
              </Typography>
              {count > 0 && (
                <View style={styles.countText}>
                  <Typography variant="body1" color="textSecondary">
                    {count}
                  </Typography>
                </View>
              )}
            </View>
          </Box>
          {data?.unread_count > 0 ? (
            <Box pb={0.5} style={styles.unreadContainer}>
              <View style={styles.unread}>
                <Typography style={styles.textCenter} variant="body2" color="white">
                  {data?.unread_count || 0}
                </Typography>
              </View>
            </Box>
          ) : (
            <></>
          )}
          <Box pb={0.5} style={styles.priceTimeHolder}>
            <Price align="left" size="small">
              {useMaskedPrice(data?.price)}
            </Price>
            <Typography variant="body2" color="textSecondary">
              {data?.last_event?.created_at
                ? moment(data?.last_event?.created_at).format('HH:mm')
                : ''}
            </Typography>
          </Box>
          <View style={styles.flexRow}>
            {showInteressed && (
              <Box pb={0.5} pr={0.5} style={{ flex: 2 }}>
                <Typography
                  style={{ paddingTop: 20, textAlign: 'center' }}
                  variant="body2"
                  color="textSecondary"
                >
                  {data?.buyers_total || 0} {$t('interested-people')}
                </Typography>
              </Box>
            )}
          </View>
        </View>
      </Box>
    </Card>
  );
}

Item.defaultProps = {
  data: null,
  onPress: null,
  showInteressed: false,
};

Item.propTypes = {
  showInteressed: PropTypes.bool,
  onPress: PropTypes.func,
  data: PropTypes.shape({
    short_description: PropTypes.string,
    price: PropTypes.number,
    thumbnail: PropTypes.string,
  }),
};

export default React.memo(Item);
