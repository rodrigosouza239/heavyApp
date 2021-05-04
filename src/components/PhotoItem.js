import Box from '@components/Box';
import { ActionButton } from '@components/Button';
import Card from '@components/Card';
import Icon from '@components/Icon';
import Typography from '@components/Typography';
import useTranslation from '@i18n/';
import { useTheme } from '@theme/';
import PropTypes from 'prop-types';
import React from 'react';
import { Dimensions, Image, View } from 'react-native';

const { width: viewportWidth } = Dimensions.get('window');

function Photo({ data, isButton, onPress, uri, index, onDelete }) {
  const $t = useTranslation();
  const {
    container: { spacingTimes },
    spacing,
    shape: { borderRadius },
  } = useTheme();

  const width = (viewportWidth - spacing(spacingTimes * 4)) / 3;
  const height = width / 1.5;

  const buttonContent = (
    <>
      <Box pb={0.5}>
        <Icon name="plus" />
      </Box>
      <Typography color="textSecondary" variant="caption">
        {$t('addPhotos')}
      </Typography>
    </>
  );

  const handleDelete = () => {
    onDelete(index, data);
  };

  const imageStyles = {
    borderRadius,
    height,
    overflow: 'hidden',
    width,
  };

  const rootStyles = {
    position: 'absolute',
    right: -spacing(),
    top: -spacing(),
  };

  return (
    <Card
      containerProps={{ px: 1 }}
      shadowPaperProps={{ disableShadow: !isButton }}
      onPress={onPress}
      style={[
        {
          alignItems: 'center',
          height,
          justifyContent: 'center',
          marginBottom: spacing(spacingTimes),
          width,
        },
      ]}
    >
      {isButton ? (
        buttonContent
      ) : (
        <View style={{ position: 'relative' }}>
          {typeof uri === 'string' && uri.length > 0 && (
            <>
              <Image source={{ uri }} resizeMode="cover" style={imageStyles} />
              <View style={rootStyles}>
                <ActionButton onPress={handleDelete} size="xx-small" name="trash" color="danger" />
              </View>
            </>
          )}
        </View>
      )}
    </Card>
  );
}

Photo.defaultProps = {
  data: null,
  index: null,
  onDelete: null,
  onPress: null,
  uri: '',
};

Photo.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  index: PropTypes.number,
  isButton: PropTypes.bool.isRequired,
  onDelete: PropTypes.func,
  onPress: PropTypes.func,
  uri: PropTypes.string,
};

export default Photo;
