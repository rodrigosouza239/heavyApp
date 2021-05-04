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

function Form({ images, onChoosePhoto, onSubmit, onDeletePhoto, progress }) {
  const $t = useTranslation();
  const fixedContainerHeight = useFixedContainerHeight();

  const buttonAdd = images?.length < MAX_IMAGES && <PhotoItem onPress={onChoosePhoto} isButton />;

  return (
    <>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="never"
        showsVerticalScrollIndicator={false}
      >
        {progress}
        <Container
          pt={0}
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

            return (
              <PhotoItem
                data={image}
                index={index}
                isButton={false}
                key={index}
                onDelete={onDeletePhoto}
                uri={image}
              />
            );
          })}
        </Container>
      </KeyboardAwareScrollView>
      <FixedContainer>
        <Button onPress={onSubmit}>{$t('continue')}</Button>
      </FixedContainer>
    </>
  );
}

Form.defaultProps = {
  images: PropTypes.array,
};

Form.propTypes = {
  images: PropTypes.array,
  onChoosePhoto: PropTypes.func.isRequired,
  onDeletePhoto: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  progress: PropTypes.element.isRequired,
};

export default Form;
