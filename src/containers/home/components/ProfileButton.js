import Typography from '@components/Typography';
import { useTheme } from '@theme/';
import PropTypes from 'prop-types';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

function ProfileButton({ onPress, initials }) {
  const {
    button: { activeOpacity },
    spacing,
    palette: {
      common: { white },
    },
  } = useTheme();

  const buttonStyles = {
    alignItems: 'center',
    backgroundColor: white,
    borderRadius: spacing(2),
    height: spacing(4),
    justifyContent: 'center',
    width: spacing(4),
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={activeOpacity}>
      <View style={buttonStyles}>
        <Typography variant="body2" fontWeight="bold" color="textSecondary">
          {initials}
        </Typography>
      </View>
    </TouchableOpacity>
  );
}

ProfileButton.defaultProps = {
  initials: 'SN',
  onPress: null,
};

ProfileButton.propTypes = {
  initials: PropTypes.string,
  onPress: PropTypes.func,
};

export default ProfileButton;
