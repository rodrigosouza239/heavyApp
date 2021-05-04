import TextInput from '@components/TextInput';
import React, { useState } from 'react';
import IconButton from '@components/Button/IconButton';
import { useTheme } from '@theme/';
import PropTypes from 'prop-types';

const PasswordTextInput = React.forwardRef((props, ref) => {
  const {
    palette: {
      text: { primary: textPrimaryColor, secondary: textSecondaryColor },
    },
  } = useTheme();

  const [showPassword, setShowPassword] = useState(true);

  const handlePress = () => setShowPassword((value) => !value);

  const renderEndAdornment = () => {
    const { value } = props;

    return (
      <IconButton
        color={value ? textSecondaryColor : textPrimaryColor}
        onPress={handlePress}
        name={showPassword ? 'visibility' : 'visibility-off'}
      />
    );
  };

  return (
    <TextInput
      autoCompleteType="password"
      autoCorrect={false}
      endAdornment={renderEndAdornment()}
      icon="lock"
      secureTextEntry={showPassword}
      {...props}
      ref={ref}
      blurOnSubmit={false} // https://github.com/facebook/react-native/issues/21911#issuecomment-547091271
    />
  );
});

PasswordTextInput.defaultProps = {
  value: '',
};

PasswordTextInput.propTypes = {
  value: PropTypes.string,
};

export default PasswordTextInput;
