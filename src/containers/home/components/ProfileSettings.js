import IconButton from '@components/Button/IconButton';
import { useNavigation } from '@react-navigation/native';
import React from 'react';

function ProfileSettings() {
  const navigation = useNavigation();

  const navigateTo = (routeName) => {
    navigation.navigate(routeName);
  };

  const handlePress = () => navigateTo('home-contact');

  return (
    <>
      <IconButton onPress={handlePress} size={32} color="white" name="help" />
    </>
  );
}

export default ProfileSettings;
