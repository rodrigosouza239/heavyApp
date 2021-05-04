import Box from '@components/Box';
import Typography from '@components/Typography';
import { useTheme } from '@theme/';
import { safeRender } from '@utils/';
import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import useTranslation from '@i18n/';

const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    width: '50%',
  },
});

function Optionals({ data }) {
  const $t = useTranslation();
  const { spacing } = useTheme();

  const itemStyle = {
    marginBottom: spacing(2),
  };

  return (
    Array.isArray(data) &&
    data.length > 0 && (
      <>
        <Box>
          <Typography variant="subtitle" fontWeight="bold" color="textSecondary">
            {$t('optionalItems')}
          </Typography>
        </Box>
        <View style={styles.row}>
          {data.map((item, index) => {
            const isLast = index + 1 === data.length;
            return safeRender(
              item,
              <View
                key={item}
                style={[styles.row, styles.item, itemStyle, isLast ? { marginBottom: 0 } : null]}
              >
                <Typography color="textSecondary" fontWeight="medium">
                  {item}
                </Typography>
              </View>,
            );
          })}
        </View>
      </>
    )
  );
}

Optionals.defaultProps = {
  data: [],
};

Optionals.propTypes = {
  data: PropTypes.arrayOf(PropTypes.string),
};

export default Optionals;
