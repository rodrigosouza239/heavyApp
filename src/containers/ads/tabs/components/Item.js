import Box from '@components/Box';
import { ActionButton } from '@components/Button';
import Card from '@components/Card';
import Container from '@components/Container';
import Image from '@components/Product/Image';
import Status from '@components/Product/Status';
import Typography from '@components/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Title from '@components/Product/Title';
import { safeRender } from '@utils/';
import useTranslation from '@i18n/';

const styles = StyleSheet.create({
  priceHolder: {
    display: 'flex',
    alignItems: 'flex-end',
  },
  dateHolder: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

function Item({ data, onPress, canEdit, onPressEdit }) {
  const $t = useTranslation();
  const handlePress = () => {
    if (onPress) {
      onPress(data);
    }
  };

  const handlePressEdit = () => {
    if (onPressEdit) {
      onPressEdit(data);
    }
  };

  return (
    <Card onPress={handlePress}>
      <Image source={data?.image} />
      <Container>
        <Box mt={2} mb={2}>
          <Title prefix={data?.brand} suffix={data?.model} />
        </Box>
        <Box mb={2} style={styles.priceHolder}>
          <Typography color="textSecondary" variant="subtitle">
            {data?.price}
          </Typography>
        </Box>
        <Box mb={2} style={styles.dateHolder}>
          <View>
            {safeRender(
              data?.createdAt,
              <Typography gutterBottom>
                {$t('createdOn')}: {data?.createdAt}
              </Typography>,
            )}
            {data?.expiresIn === '' ? (
              <Typography>
                {$t('expiresIn')}: {`${$t('expirationPaused')}`}
              </Typography>
            ) : (
              <Typography>
                {$t('expiresIn')}: {data?.expiresIn}
              </Typography>
            )}
          </View>
          {canEdit && <ActionButton name="pencil" onPress={handlePressEdit} />}
        </Box>
        <Status status={data?.status} />
      </Container>
    </Card>
  );
}

Item.defaultProps = {
  canEdit: false,
  onPress: null,
  onPressEdit: null,
  data: null,
};

Item.propTypes = {
  canEdit: PropTypes.bool,
  onPress: PropTypes.func,
  onPressEdit: PropTypes.func,
  data: PropTypes.shape({
    brand: PropTypes.string,
    createdAt: PropTypes.string,
    expiresIn: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    image: PropTypes.shape({ uri: PropTypes.string }),
    model: PropTypes.string,
    price: PropTypes.string,
    status: PropTypes.string,
  }),
};

export default React.memo(Item);
