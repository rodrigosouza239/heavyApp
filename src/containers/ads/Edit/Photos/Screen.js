import Loading from '@components/Loading';
import useTranslation from '@i18n/';
import { useVehicleStatus } from '@utils/';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { saveAd, saveImage } from '../../ducks';
import Form from './Form';

function Photos({ navigation, route }) {
  const $t = useTranslation();
  const { initialValues } = route.params;
  const originalImages = initialValues?.images ?? [];
  const [images, setImages] = useState(originalImages);
  const dispatch = useDispatch();
  const vehicleStatus = useVehicleStatus();

  const { vehicleSavingSuccess, vehicleSavingLoading } = useSelector((state) => state.ads);

  const handleSubmit = () => {
    const imagesToAdd = images.filter((image) => !image?.id);
    const imagesToDelete = originalImages.filter((originalImage) => {
      return !images.find((newImage) => newImage.id === originalImage.id);
    });

    dispatch(saveImage({ imagesToAdd, imagesToDelete }));
    dispatch(saveAd({ id: initialValues?.id, status: vehicleStatus['review-edited'].status }));
  };

  useEffect(() => {
    if (vehicleSavingSuccess) {
      navigation.navigate('ads-edit', { success: true });
    }
  }, [vehicleSavingSuccess]);

  const handleImagePicked = (image) => {
    setImages((prevImages) => [...prevImages, { uri: image, vehicle_id: initialValues?.id }]);
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      handleImagePicked(result.uri);
    }
  };

  const handleChoosePhoto = async () => {
    if (Constants.platform.ios) {
      const { status } = await ImagePicker.requestCameraRollPermissionsAsync();

      if (status !== 'granted') {
        return Alert.alert($t('permission'), $t('cameraRollPermission'));
      }
    }

    return pickImage();
  };

  const handleDeletePhoto = (index) => {
    setImages((prevImages) => {
      return prevImages.filter((image, i) => index !== i);
    });
  };

  return (
    <>
      <Form
        images={images}
        onChoosePhoto={handleChoosePhoto}
        onDeletePhoto={handleDeletePhoto}
        onSubmit={handleSubmit}
        vehicleSavingLoading={vehicleSavingLoading}
      />
      <Loading loading={vehicleSavingLoading} />
    </>
  );
}

Photos.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      initialValues: PropTypes.shape({
        id: PropTypes.number,
        images: PropTypes.array,
      }),
    }),
  }).isRequired,
};

export default Photos;
