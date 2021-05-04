import Box from '@components/Box';
import Container from '@components/Container';
import Typography from '@components/Typography';
import useTranslation from '@i18n/';
import { useTheme } from '@theme/';
import PropTypes from 'prop-types';
import React from 'react';
import { ScrollView } from 'react-native';
import Category from './Category';

function Categories({ products, loading }) {
  const {
    spacing,
    container: { spacingTimes },
  } = useTheme();

  const $t = useTranslation();

  const scrollStyles = {
    paddingHorizontal: spacing(spacingTimes),
  };

  let computedProducts = products;

  if (loading) {
    computedProducts = Array.from(Array(10).keys());
  }

  return (
    <>
      <Container py={0}>
        <Box mt={2} mb={1}>
          <Typography fontWeight="bold">{$t('whatSee')}</Typography>
        </Box>
      </Container>
      <Box>
        <ScrollView
          contentContainerStyle={scrollStyles}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {Array.isArray(computedProducts) &&
            computedProducts.map((item, index) => {
              const isFirst = index === 0;
              const isLast = index === computedProducts.length - 1;

              return (
                <Category
                  containerProps={{ pl: isFirst ? 0 : 1, pr: isLast ? 0 : 1 }}
                  id={typeof item === 'object' ? item?.id : null}
                  image={item?.image?.thumbnail}
                  key={loading ? index : item?.id}
                  loading={loading}
                  title={item?.description}
                />
              );
            })}
        </ScrollView>
      </Box>
    </>
  );
}

Categories.defaultProps = {
  products: [],
};

Categories.propTypes = {
  loading: PropTypes.bool.isRequired,
  products: PropTypes.array,
};

export default Categories;
