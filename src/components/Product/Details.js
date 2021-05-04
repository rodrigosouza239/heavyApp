import Icon from '@components/Icon';
import Typography from '@components/Typography';
import { useTheme } from '@theme/';
import { safeRender } from '@utils/';
import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import useTranslation from '@i18n/';
import MotorSvg from '../../../assets/images/icon_hr_de_motor.svg';
import TrackSvg from '../../../assets/images/icon_hr_de_trilha.svg';

const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    flexWrap: 'wrap',
  },
  flex: {
    flex: 1,
  },
  fontSize: {
    fontSize: 11,
  },
});

function Details({ data: { location, ...data }, onlyIcons, isRow }) {
  const $t = useTranslation();
  const { spacing } = useTheme();

  const iconStyle = {
    marginRight: spacing(1),
  };

  const itemStyle = {
    marginBottom: spacing(1),
  };

  const renderLocation = `${location?.description}, ${location?.state?.description} - ${location?.state?.initials}`;

  return (
    <View>
      {safeRender(
        data?.product,
        <View style={[styles.row, styles.item, !isRow ? itemStyle : {}]}>
          <Icon style={iconStyle} name="tractor" />
          {!onlyIcons && (
            <Typography fontWeight="bold" color="textSecondary">
              {$t('type')}:{' '}
            </Typography>
          )}
          <View style={styles.flex}>
            <Typography
              color="textSecondary"
              fontWeight="medium"
              style={isRow ? styles.fontSize : {}}
            >
              {data?.product}
            </Typography>
          </View>
        </View>,
      )}
      {safeRender(
        data?.fabricationYear,
        <View style={[styles.row, styles.item, !isRow ? itemStyle : {}]}>
          <Icon style={iconStyle} name="calendar" />
          {!onlyIcons && (
            <Typography fontWeight="bold" color="textSecondary">
              {$t('year')}:{' '}
            </Typography>
          )}
          <View style={styles.flex}>
            <Typography
              color="textSecondary"
              fontWeight="medium"
              style={isRow ? styles.fontSize : {}}
            >
              {data?.fabricationYear}
            </Typography>
          </View>
        </View>,
      )}
      {safeRender(
        data?.mileAge,
        <View style={[styles.row, styles.item, !isRow ? itemStyle : {}]}>
          <Icon style={iconStyle} name="tachometer-fast" />
          {!onlyIcons && (
            <Typography fontWeight="bold" color="textSecondary">
              {$t('mileage')}:{' '}
            </Typography>
          )}
          <View style={styles.flex}>
            <Typography
              color="textSecondary"
              fontWeight="medium"
              style={isRow ? styles.fontSize : {}}
            >
              {data?.mileAge}km
            </Typography>
          </View>
        </View>,
      )}
      {safeRender(
        data?.motorHours,
        <View style={[styles.row, styles.item, !isRow ? itemStyle : {}]}>
          <MotorSvg style={[iconStyle, { marginLeft: 5, marginRight: spacing(1.2) }]} />
          {!onlyIcons && (
            <Typography fontWeight="bold" color="textSecondary">
              {$t('engineHours')}:{' '}
            </Typography>
          )}
          <View style={styles.flex}>
            <Typography
              color="textSecondary"
              fontWeight="medium"
              style={isRow ? styles.fontSize : {}}
            >
              {data?.motorHours}h
            </Typography>
          </View>
        </View>,
      )}
      {safeRender(
        data?.trackHours,
        <View style={[styles.row, styles.item, !isRow ? itemStyle : {}]}>
          <TrackSvg style={[iconStyle, { marginLeft: 5, marginRight: spacing(1.2) }]} />

          {!onlyIcons && (
            <Typography fontWeight="bold" color="textSecondary">
              {$t('trackHours')}:{' '}
            </Typography>
          )}
          <View style={styles.flex}>
            <Typography
              color="textSecondary"
              fontWeight="medium"
              style={isRow ? styles.fontSize : {}}
            >
              {data?.trackHours}h
            </Typography>
          </View>
        </View>,
      )}
      {safeRender(
        location,
        <View style={[styles.row, styles.item]}>
          <Icon style={iconStyle} name="map-marker" />
          <View style={styles.flex}>
            <Typography
              color="textSecondary"
              fontWeight="medium"
              style={isRow ? styles.fontSize : {}}
            >
              {renderLocation}
            </Typography>
          </View>
        </View>,
      )}
    </View>
  );
}

Details.defaultProps = {
  data: null,
  onlyIcons: null,
};

Details.propTypes = {
  data: PropTypes.shape({
    fabricationYear: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    mileAge: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    motorHours: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    product: PropTypes.string,
    trackHours: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    location: PropTypes.object,
    onlyIcons: PropTypes.bool,
  }),
};

export default Details;
