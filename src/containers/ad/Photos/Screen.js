import Container from '@components/Container';
import Typography from '@components/Typography';
import useTranslation from '@i18n/';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import PropTypes from 'prop-types';
import React from 'react';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Progress from '../components/Progress';
import { updateInitialValues } from '../ducks';
import Form from './Form';

function Photos({ navigation }) {
  const $t = useTranslation();
  const dispatch = useDispatch();
  const {
    initialValues: { images },
  } = useSelector((state) => state.ad);

  const handleSubmit = () => {
    navigation.navigate('home-plans');
  };

  const handleImagePicked = (image) => {
    dispatch(updateInitialValues({ images: [...images, image] }));
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
    dispatch(updateInitialValues({ images: images.filter((item, i) => i !== index) }));
  };

  const progress = (
    <Container pb={0}>
      <Progress
        pageIndex={9}
        currentStep="second"
        description={
          <>
            <Typography variant="body2" align="center" color="textSecondary">
              {$t('createAdTitles.now')}{' '}
              <Typography variant="body2" color="textSecondary" fontWeight="bold">
                {$t('createAdTitles.add')}
              </Typography>{' '}
              {$t('createAdTitles.even')}{' '}
              <Typography variant="body2" color="textSecondary" fontWeight="bold">
                8
              </Typography>
              {'\n'}
              {$t('createAdTitles.clearPhotos')}
            </Typography>
          </>
        }
      />
    </Container>
  );

  return (
    <>
      <Form
        images={images}
        onChoosePhoto={handleChoosePhoto}
        onSubmit={handleSubmit}
        progress={progress}
        onDeletePhoto={handleDeletePhoto}
      />
    </>
  );
}

Photos.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default Photos;
