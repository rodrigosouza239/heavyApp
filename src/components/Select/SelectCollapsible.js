import Icon, { iconNames } from '@components/Icon';
import ListItem from '@components/ListItem';
import TextInput from '@components/TextInput';
import { useTheme } from '@theme';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Animated, Easing, Keyboard, StyleSheet, View } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';

const SECTIONS = [
  {
    title: '',
    content: '',
  },
];

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
  },
  iconHolder: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 10,
  },
});

const SelectCollapsible = React.forwardRef(
  ({ label, onChange, options, onFocus, value, icon: iconName, ...rest }, ref) => {
    const [activeSections, setActiveSections] = useState([]);
    const [rotated] = useState(new Animated.Value(0));

    // TODO: remove this line after upgrade react-native-collapsible
    /* eslint-disable-next-line */

    const {
      input: { borderColor, borderWidth, height, paddingLeftWithIcon, paddingRight },
      shape: { borderRadius },
      icon,
      palette: { divider },
    } = useTheme();

    const getSelectedLabel = () => {
      const selectedItem = options.find((option) => option.value === value);
      return selectedItem ? selectedItem.label : '';
    };

    const open = () => {
      setActiveSections([0]);
    };

    const close = () => {
      setActiveSections([]);
    };

    const blur = () => {
      if (ref.current.blur) {
        ref.current.blur();
      }
    };

    const handleFocus = () => {
      open();
      blur();
      if (onFocus) {
        onFocus();
      }
    };

    const closeKeyboard = () => Keyboard.dismiss();

    const handleChange = (selectedValue) => {
      close();

      if (onChange) {
        onChange(selectedValue);
      }
    };

    const animateIcon = (isActive) => {
      Animated.spring(rotated, {
        toValue: isActive ? 1 : 0,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
    };

    const renderHeader = (section, index, isActive) => {
      animateIcon(isActive);

      const degree = rotated.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg'],
      });

      return (
        <View style={[styles.root, { height }]}>
          <Animated.View
            style={[
              {
                backgroundColor: divider,
                borderRadius: icon.size / 2,
                height: icon.size,
                right: paddingRight,
                transform: [{ rotate: degree }],
                width: icon.size,
              },
              styles.iconHolder,
            ]}
          >
            <Icon name="angle-down" />
          </Animated.View>
          <TextInput
            autoCompleteType="off"
            autoCorrect={false}
            icon={iconName}
            label={label}
            onFocus={handleFocus}
            style={{ borderWidth: 0 }}
            value={getSelectedLabel()}
            {...rest}
            ref={ref}
          />
          <View style={{ ...StyleSheet.absoluteFill, zIndex: 5 }} />
        </View>
      );
    };

    const renderContent = () => {
      if (Array.isArray(options)) {
        return options.map((option) => (
          <ListItem
            style={{ paddingLeft: paddingLeftWithIcon }}
            onPress={handleChange}
            key={option.value}
            value={option.value}
          >
            {option.label}
          </ListItem>
        ));
      }

      return null;
    };

    const updateSections = (sections) => setActiveSections(sections);

    return (
      <Accordion
        activeSections={activeSections}
        onChange={updateSections}
        renderContent={renderContent}
        renderHeader={renderHeader}
        sectionContainerStyle={{ borderWidth, borderColor, borderRadius }}
        sections={SECTIONS}
        underlayColor="transparent"
        onAnimationEnd={closeKeyboard}
      />
    );
  },
);

SelectCollapsible.defaultProps = {
  onChange: null,
  onFocus: null,
  options: null,
  value: null,
  icon: null,
};

SelectCollapsible.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  value: PropTypes.string,
  icon: PropTypes.oneOf(iconNames),
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.node,
      value: PropTypes.node,
    }),
  ),
};

export default SelectCollapsible;
