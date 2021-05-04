/* eslint-disable react/prop-types */
import Box from '@components/Box';
import Card from '@components/Card';
import Icon from '@components/Icon';
import Title from '@components/Product/Title';
import Typography from '@components/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import moment from 'moment';
import { useTheme } from '@theme/';

function Item({ data, onPress }) {
  const handlePress = () => {
    if (typeof onPress === 'function') {
      onPress(data);
    }
  };

  const { palette } = useTheme();

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
      position: 'absolute',
      right: 0,
      top: 0,
    },
  });

  // const [count, setCount] = useState(0);

  // const countMessages = () => {
  //   // eslint-disable-next-line no-shadow
  //   const count = 0;
  //   if (user) {
  //     // eslint-disable-next-line array-callback-return
  //     user?.map((item) => {
  //       if (item?.user?.id === data?.id) setCount(count + 1);
  //     });
  //   }
  // };

  // useEffect(() => {
  //   countMessages();
  // }, []);

  return (
    <Card onPress={handlePress}>
      <Box p={2} style={styles.row}>
        <Box mr={2}>
          <Icon name="user" size={90} />
        </Box>
        <View style={styles.flex}>
          <Box mb={0.5} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Title size="small" hideSeparator suffix="" prefix={data?.name} />
            {data?.unread_count <= 0 && (
              <View style={styles.countText}>
                <Typography variant="body1" color="textSecondary">
                  {data?.unread_count + 1}
                </Typography>
              </View>
            )}
          </Box>
          <Box mb={0.5} style={styles.priceTimeHolder}>
            <Typography variant="body2" color="textSecondary">
              {data?.email}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {data?.last_event?.created_at && moment(data?.last_event?.created_at).format('HH:mm')}
            </Typography>
          </Box>
          <Box mt={0.5}>
            <Typography color="textSecondary" variant="caption">
              {data?.last_event?.event?.text}
            </Typography>
          </Box>
        </View>
      </Box>
    </Card>
  );
}

Item.defaultProps = {
  onPress: null,
  data: null,
};

Item.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  }),
  onPress: PropTypes.func,
};

export default React.memo(Item);
