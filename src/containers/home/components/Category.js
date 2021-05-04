import Card from '@components/Card';
import Shimmer from '@components/Shimmer';
import Typography from '@components/Typography';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@theme/';
import { wpd } from '@utils/';
import PropTypes from 'prop-types';
import React from 'react';
import { Image, View } from 'react-native';

const size = 110;

function Category({ containerProps, id, image, loading, title }) {
  const navigation = useNavigation();

  const {
    palette: {
      divider,
      common: { white },
    },
    shape: { borderRadius },
    spacing,
  } = useTheme();

  const cardStyles = {
    display: 'flex',
    minHeight: size,
    minWidth: size,
    padding: spacing(0.5),
  };

  const titleHolderStyles = {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing(1),
    width: wpd(30),
  };

  const imageHeight = 60;

  const imageHolderStyles = {
    backgroundColor: image || loading ? white : divider,
    borderRadius: borderRadius / 2,
    height: imageHeight,
    width: wpd(30),
  };

  const imageLoadingStyles = {
    height: imageHeight,
    width: size,
  };

  const titleLoadingStyles = {
    height: 10,
    width: size - 20,
  };

  const handlePress = () => {
    if (id) {
      navigation.navigate('tab-search', {
        screen: 'search-results',
        initial: false,
        params: {
          filter: { product_id: id },
        },
      });
    }
  };

  return (
    <Card
      onPress={handlePress}
      containerProps={{ px: 0, pb: 2, ...containerProps }}
      style={cardStyles}
    >
      <View style={imageHolderStyles}>
        {loading ? (
          <Shimmer>
            <View style={imageLoadingStyles} />
          </Shimmer>
        ) : (
          <Image
            style={{
              height: imageHeight,
            }}
            resizeMode="cover"
            source={{ uri: image }}
          />
        )}
      </View>
      <View style={titleHolderStyles}>
        {loading ? (
          <Shimmer>
            <View style={titleLoadingStyles} />
          </Shimmer>
        ) : (
          <Typography
            style={{ textAlign: 'center' }}
            variant="body2"
            fontWeight="medium"
            color="textSecondary"
          >
            {title}
          </Typography>
        )}
      </View>
    </Card>
  );
}

Category.defaultProps = {
  containerProps: null,
  id: null,
  image: '',
  loading: false,
  title: '',
};

Category.propTypes = {
  containerProps: PropTypes.object,
  id: PropTypes.number,
  image: PropTypes.string,
  loading: PropTypes.bool,
  title: PropTypes.string,
};

export default Category;
