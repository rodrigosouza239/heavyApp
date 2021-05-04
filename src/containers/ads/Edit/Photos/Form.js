import Button from '@components/Button';
import FixedContainer, { useFixedContainerHeight } from '@components/Button/FixedContainer';
import Container from '@components/Container';
import PhotoItem from '@components/PhotoItem';
import useTranslation from '@i18n/';
import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
});

const MAX_IMAGES = 8;

function Form({ vehicleSavingLoading, images, onChoosePhoto, onSubmit, onDeletePhoto }) {
  const fixedContainerHeight = useFixedContainerHeight();
  const $t = useTranslation();

  const buttonAdd = images?.length < MAX_IMAGES && <PhotoItem onPress={onChoosePhoto} isButton />;

  return (
    <>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="never"
        showsVerticalScrollIndicator={false}
      >
        <Container
          px={1}
          style={[
            styles.root,
            {
              paddingBottom: fixedContainerHeight,
            },
          ]}
        >
          {buttonAdd}
          {Array.from(Array(MAX_IMAGES).keys()).map((index) => {
            const image = images[index];
            const typeOfImage = typeof image;
            return (
              <PhotoItem
                data={image}
                index={index}
                isButton={false}
                key={index}
                onDelete={onDeletePhoto}
                uri={typeOfImage === 'object' ? image?.uri : image}
              />
            );
          })}
        </Container>
      </KeyboardAwareScrollView>
      <FixedContainer>
        <Button loading={vehicleSavingLoading} onPress={onSubmit}>
          {$t('save')}
        </Button>
      </FixedContainer>
    </>
  );
}

Form.propTypes = {
  images: PropTypes.array.isRequired,
  onChoosePhoto: PropTypes.func.isRequired,
  onDeletePhoto: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  vehicleSavingLoading: PropTypes.bool.isRequired,
};

export default Form;
