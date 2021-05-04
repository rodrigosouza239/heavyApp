import Carousel, { useCarouselSizes } from '@components/Carousel';
import Icon from '@components/Icon';
import { OrientationContext } from '@components/OrientationProvider';
import { useTheme } from '@theme/';
import PropTypes from 'prop-types';
import React, { useEffect, useState, useContext } from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';

import { Dimensions, Image as NativeImage, Modal, Platform, StyleSheet, View } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

const { width: viewportWidth } = Dimensions.get('window');

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  relative: {
    position: 'relative',
  },
});

function Image({ source }) {
  const [modalVisible, setModalVisible] = useState(false);
  const { orientation } = useContext(OrientationContext);
  const {
    container: { spacingTimes },
    spacing,
    shape: { borderRadius },
  } = useTheme();

  const width = viewportWidth - spacing(spacingTimes * 2);
  const { sliderHeight } = useCarouselSizes();

  useEffect(() => {
    return () => {
      setModalVisible(false);
    };
  }, []);

  useEffect(() => {
    if (Platform.OS.toLowerCase() === 'android') {
      if (modalVisible) {
        ScreenOrientation.unlockAsync();
      } else {
        ScreenOrientation.lockAsync(ScreenOrientation.Orientation.PORTRAIT_DOWN);
      }
    }
  }, [modalVisible]);

  return (
    <View style={styles.relative}>
      <View
        style={[
          styles.root,
          {
            width,
            height: sliderHeight,
          },
        ]}
      >
        <Icon disabled name="images" size={56} />
      </View>
      {Array.isArray(source) ? (
        <Carousel
          data={source.map(({ uri }) => uri)}
          handleOpenModal={() => {
            setModalVisible(true);
          }}
        />
      ) : (
        <View style={{ flexDirection: 'row', flex: 1, height: sliderHeight * 0.66 }}>
          <NativeImage
            style={{
              flex: 1,
              width: undefined,
              height: undefined,
              borderTopLeftRadius: borderRadius / 2,
              borderTopRightRadius: borderRadius / 2,
            }}
            resizeMode="stretch"
            source={source}
          />
        </View>
      )}
      <Modal visible={modalVisible} transparent>
        <ImageViewer
          onCancel={() => setModalVisible(false)}
          enableSwipeDown
          enableImageZoom
          onSwipeDown={() => setModalVisible(false)}
          imageUrls={
            Array.isArray(source)
              ? source.map(({ uri }) => ({
                  url: uri,
                }))
              : [{ uri: source }]
          }
          renderImage={({ style, ...imageProps }) => (
            <NativeImage
              {...imageProps}
              style={[
                style,
                {
                  ...(Platform.OS.toLowerCase() === 'ios' && {
                    transform: [{ rotate: `${orientation || 0}deg` }],
                  }),
                },
              ]}
            />
          )}
        />
      </Modal>
    </View>
  );
}

Image.defaultProps = {
  source: {
    uri: '',
  },
};

Image.propTypes = {
  source: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape({ uri: PropTypes.string.isRequired })),
    PropTypes.shape({
      uri: PropTypes.string,
    }),
  ]),
};

export default Image;
