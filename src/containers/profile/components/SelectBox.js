import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { useTheme } from '@theme';
import Box from '@components/Box';
import Icon from '@components/Icon';

function SelectBox({ title, desc, onPress }) {
  const theme = useTheme();

  const {
    palette: { secondary, common, divider },
    icon,
    input: { paddingLeft },
    typography: { subtitle },
  } = theme;

  const boxStyle = {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 20,
    borderBottomWidth: 2,
    borderBottomColor: divider,
  };

  const iconStyle = {
    justifyContent: 'center',
    alignItems: 'center',
    width: icon.size,
    height: icon.size,
    backgroundColor: divider,
    borderRadius: icon.size / 2,
    marginLeft: paddingLeft,
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <Box style={boxStyle}>
        <Box style={{ flex: 4 }}>
          <Text style={{ color: secondary.main, ...subtitle }}>{title}</Text>
          <Text>{desc}</Text>
        </Box>
        <Box style={{ flex: 1, alignItems: 'center' }}>
          <Box style={iconStyle}>
            <Icon onPress={() => {}} name="angle-right" color={common.white} />
          </Box>
        </Box>
      </Box>
    </TouchableOpacity>
  );
}

SelectBox.defaultProps = {
  onPress: () => {},
};

SelectBox.propTypes = {
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  onPress: PropTypes.func,
};

export default SelectBox;
